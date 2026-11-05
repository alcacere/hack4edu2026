# Ceiba: offline lesson planner with a curriculum library (demo plan)

## Context

**Goal.** A teacher types "generate a study plan for 5th grade about the water cycle". Ceiba answers with a structured, step-by-step plan fitted to that grade and built from a local library, with every step showing its source. It runs with no internet, on a normal laptop.

**Where the repo stands (checked 2026-11-05, 07:45)**
- Delivery is **tonight at 23:59**. The team's own schedule freezes at 17:00 and aims to submit at 23:00. The last commit was 2026-11-04 09:02.
- Working: app skeleton, `ai/` layer (Ollama + recorded demo mode), JSON validation with one retry, 5-question profile.
- Missing: the plan flow (issue #9 has no code and no comments), the library, and a README. A stray `0001-*.patch` sits in the root.
- `docs/STATE.md` lists "RAG de currículos" as **out of scope**, and the product is described as a mentor chat. This plan reverses that, so the docs must change too.
- This laptop (the demo machine) has 7.5 GB RAM, 8 cores, no GPU and native Ollama 0.12.11. Per `docs/research/gemma4.md`, Gemma 4 needs Ollama 0.30.9 or later, and it isn't downloaded here.

**Decisions from you:** Reto 12 ★, Peru's CNEB curriculum, this laptop for the demo.

## Scope

| Keep | Cut |
|---|---|
| One main screen: request → sources → plan | Reflection flow (#12) and free chat |
| Existing profile, as an optional link | "Saludar al mentor" button on the main screen |
| Recorded demo mode as the safety net | Embeddings, vector DB, SQLite, PDF ingestion |
| "One small step this week" at the end of each plan (this is the Reto 12 coaching link) | Model selector, accounts, PWA or packaging |

## Key decision 1: the model

**`gemma4:e2b` through Ollama, and only that model.** This keeps the team's existing decision.
- Apache-2.0, 4.6 GB on disk. It has already run on about 7.6 GB RAM (14.6 tok/s, roughly 2 min cold start, using swap).
- `e4b` isn't an option on this laptop, because its 6.6 GB of files won't fit well in 7.5 GB RAM.
- **No embedding model:** a second model would compete for the same scarce RAM.

**Setup without touching the native Ollama:** run it in Docker on another port.
```bash
docker run -d --name ollama --restart unless-stopped -p 127.0.0.1:11435:11434 \
  -v ollama:/root/.ollama -e OLLAMA_KEEP_ALIVE=30m -e OLLAMA_CONTEXT_LENGTH=4096 ollama/ollama
docker exec ollama ollama pull gemma4:e2b
# .env: LLM_BASE_URL=http://localhost:11435/v1
```

**What this means for the design:** 14.6 tok/s means about 30 s for 450 tokens. So plans stay short (at most 450 output tokens, 1–3 sessions, 3–5 steps each), the context sent stays under about 1,500 tokens, and the plan flow gets its own 180 s timeout (the 60 s default stays elsewhere). Sources appear immediately, so the wait doesn't feel empty.

**Go/no-go at 09:00 (Step 0):** if one real plan takes over 120 s or the machine thrashes, shrink the plan to 1 session. If that still fails, record on the 16-core machine and say so openly. Don't quietly switch models.

## Key decision 2: the library is a folder of curated Markdown, not a database

With 12–15 entries, grade and subject filters do most of the work and keyword search finds the topic. A database or vector store would add moving parts and RAM with no visible gain in the demo. It's also a good pitch: a ministry or NGO can extend the library by adding a text file, with no server.

**The unit is a "ficha": a teacher-ready digest, not a book.** That's what stops the AI from just pointing at documents.

`library/fichas/ciencia-y-tecnologia/5-ciclo-del-agua.md`
```markdown
---
id: cyt-5-ciclo-agua
grado: 5
area: Ciencia y Tecnología
tema: El ciclo del agua
alias: [water cycle, evaporación, condensación, precipitación]
competencia: Explica el mundo físico…   # exact wording checked against the source
fuente: Programa Curricular de Primaria, MINEDU, p. X
url: https://…
revisado: false                         # true only after a person has checked it
---
## Qué debe lograr
## Ideas clave
## Errores frecuentes
## Actividades sin tecnología
## Cómo comprobar lo aprendido
```

**Content for the demo**
- Must have (6): water cycle in **3.º and 5.º** (same topic, different grade, which is the key demo moment), fractions in 3.º and 5.º, plus 2 more Ciencia y Tecnología.
- Target (12–15): add Comunicación and Personal Social. Stop at 6 if time runs short.

**Sourcing rules (Base 9, and the rule against unmeasured claims)**
- Written in our own words, citing the official source with its page. No copied text.
- Use MINEDU's public documents. The starting point is the [Ciencia y Tecnología teacher guide](https://repositorio.minedu.gob.pe/handle/20.500.12799/6399). **My search did not find the official Programa Curricular PDF**, only secondary copies, so someone must get it from MINEDU and check grades, competencies and resolution numbers before anything is cited.
- AI may help draft a ficha, but a person checks it against the source before setting `revisado: true`. The UI shows when a ficha is unreviewed.
- Say "based on the CNEB", never "aligned with" or "certified".
- Written today, so it stays inside the Innovadora window (3–5 Nov).

## How a request becomes a plan

```
Teacher's text
 → 1. parse (no AI): grade, topic words, sessions, minutes → editable fields
 → 2. search (no AI): filter by grade, then keyword rank → top fichas shown at once
 → 3. generate (Gemma): fixed prompt + the ficha sections → JSON plan
 → 4. check (no AI): schema, minutes, source ids → one retry → editable plan
```

1. **Parse.** Regex handles `5`, `5.º`, `quinto`, `5th grade`, and session and minute counts. A missing grade means asking for it, never guessing. Aliases let the English example find the Spanish ficha; the output stays in Spanish.
2. **Search.** BM25 of about 40 lines over ficha sections, accent-insensitive with basic Spanish plurals, and weighted towards `tema` and `alias`. **Grade filter is strict.**
   - Topic exists in another grade: say so ("I have this for 3.º, not 5.º") and let the teacher choose.
   - Nothing found: **no plan and no model call**. Show which topics exist for that grade. This honest "I don't have that" is part of the demo.
3. **Generate.** The model gets only grade, ficha topic, sessions, minutes and ficha text. **The teacher's free text is never sent**, so student names can't reach the model and pasted text can't redirect it. The trade-off is that nuance in the request is lost, so optional fixed fields cover it (for example "no student devices", on by default).
4. **Check.** Output schema:
   ```
   {titulo, objetivo, sesiones:[{titulo, minutos, pasos:[{texto, fuente}]}],
    materiales[], comprobacion[], microaccion}
   ```
   Rejected and retried once if minutes exceed the request, `fuente` isn't one of the fichas supplied, or `microaccion` is over 40 words.

**Known limit:** a valid source id proves the step points to a real ficha, not that it is faithful to it. So each step's source opens the ficha text for the teacher to compare, every plan is marked "borrador sin validar", and a person reads real outputs in Step 5.

**The teacher decides:** the plan is editable in place, with print and copy buttons. This replaces the 9 accept/edit/discard actions in criterion C5.

## Implementation steps

### Step 0 (08:00–09:00): reset and go/no-go
- Set up Ollama as above and generate one real plan from a hand-written ficha using `curl`. Record time, tok/s and RAM (`docker stats`).
- Test `response_format: json_schema` on this version. I only found third-party documentation that it works ([Pydantic](https://pydantic.dev/docs/ai/models/ollama/index.md)). If it doesn't, stay on `json_object` plus the existing validation.
- Docs: add `docs/PLAN.md` (this plan). Update `docs/STATE.md` (product, scope, schedule, this machine, the Docker port and the reversed RAG decision). Delete the stray patch.

### Step 1 (09:00–11:00): library and search
- `library/fichas/**`: the format plus the first 2 fichas.
- `ai/library/search.ts`: pure parse and BM25 functions, no Vite imports, so a script can test them.
- `ai/library/index.ts`: loads fichas with `import.meta.glob(..., {query:'?raw', eager:true})`, the same `?raw` approach as `ai/prompts.ts`.
- `scripts/check-library.ts` (`npm run library:check`, needs Node ≥ 22.6): fails on missing fields or duplicate ids, and runs the expected-result searches listed under Verification.

### Step 2 (11:00–13:00): generation
- `ai/types.ts`, `ai/providers/openai.ts`: add per-request `timeoutMs` and optional `jsonSchema`.
- `ai/schemas.ts`: `PlanOut` and `validatePlan(v, {minutos, fuentesPermitidas})`, following `validatePerfil`.
- `ai/prompts/plan.md` (registered in `ai/prompts.ts`), with one short example, in the style of `perfil.md`.
- `ai/index.ts`: `planClase()`, reusing `chatJson()`. If a profile level exists, it adjusts only the wording of `microaccion`.

### Step 3 (13:00–14:30): interface
- New `app/src/plan/Plan.tsx`: text box → editable fields → sources → elapsed timer and cancel → plan → edit, print, copy.
- `app/src/App.tsx`: plan becomes the main screen, with the profile as a link and the "Saludar" button removed. Reuse `Metricas.tsx`, `session.ts`, and the existing `es.plan` and `errores` text in `app/src/copy/es.ts`, adding only what's missing.

### Step 4 (14:30–15:00): safety net
- Record `fixtures/plan.json` **from real runs** using the ficha id as `fixtureKey`, with the true model and tok/s. Search stays live in demo mode, and only generation is recorded.
- `scripts/mock-llm.mjs`: add a valid plan response. New `scripts/smoke-plan.mjs`, based on `smoke-perfil.mjs`.

### Step 5 (15:00–17:00): test and freeze
- Run all checks below. Fix only what breaks the demo path.
- Test with 2–3 teachers if available (#17); otherwise remove that line from the pitch. No real student data.
- Update `docs/review/criterios.md` and `escenarios.md`: remove reflection (R*, E6, E8 first part), add library criteria.
- **17:00: freeze, tag `v1.0`.**

### Step 6 (17:00–23:00): delivery (Bases 3, 5 and 9)
- **README** (currently missing): problem, one-command run, architecture, how to add a ficha, what is real / simulated / unvalidated, model and licences.
- Licences: MIT for code, CC BY-NC-SA 3.0 for docs and fichas. Check ficha sources are compatible.
- Rewrite `docs/pitch/pitch-v1.md` around the new demo. **3-minute video** (real run, Wi-Fi off, wait time cut and labelled as cut), **5-minute deck**, GitHub link.
- Clean-clone test, then **submit by 23:00**. Check the repo is public and that frequent commits today show the Innovadora evidence.

**If time runs short, cut in this order:** the fichas beyond 6 → print and copy → profile link → in-place editing (keep copy). Never cut: source display, the "no material" response, offline operation, the recorded fallback.

## Verification

| Check | How | Pass |
|---|---|---|
| Core request | "Plan de estudio para 5.º sobre el ciclo del agua", 2 sessions | Structured plan, sources shown, minutes within limit |
| English request | "study plan for 5 grade students about the water cycle" | Finds the same ficha; plan in Spanish |
| Grade adapts | Same topic in 3.º vs 5.º | Different fichas cited and visibly different content; a person confirms |
| Faithfulness | A person reads 5 plans against their fichas, 2 runs each | No invented facts; any failure is reported, not hidden |
| No material | "fotosíntesis" if no ficha exists | No plan, **0 requests to `/llm`** |
| Wrong grade | Topic exists only in another grade | Says so; doesn't substitute silently |
| Missing grade | Request with no grade | Asks for it |
| Student data | E7 text (fictional names, "TDAH") | Absent from the `/llm` payload in DevTools |
| Bad model output | `npm run mock-llm` | Exactly 2 requests, friendly Spanish error |
| Model down | `docker stop ollama` | Clear message within 30 s; retry works without reloading |
| Offline, real model | Wi-Fi off, full path | Works; no external requests |
| Offline, demo | `npm run demo`, Wi-Fi and Ollama off | Full path works, demo label visible, no invented metrics |
| Basic checks | `npm run typecheck && npm run build && npm run library:check` | All pass |
| Clean clone | Fresh clone, follow the README only | App opens |

Publish measured numbers only: cold and warm time, tok/s and RAM on this laptop.

## Needs a person
1. Get the official MINEDU curriculum PDF and check the fichas against it (`revisado: true`).
2. Confirm with your site that **Innovadora** and **Reto 12** are what's registered, and the deadline: my dates come from the Bases and an older team note.
3. Find teachers for the 15:00 test, then record and submit the video and deck.

## Repo actions included if you approve
Frequent commits to `main` during the day, as Innovadora evidence. **The repo is public**, so pushes and any issue updates (#9 redefined, #12 cut) are visible straight away; the `v1.0` tag and the submission also happen as described above.

## Sources
- [MINEDU, Orientaciones para la enseñanza de Ciencia y Tecnología (Primaria)](https://repositorio.minedu.gob.pe/handle/20.500.12799/6399)
- [Pydantic AI, Ollama model docs](https://pydantic.dev/docs/ai/models/ollama/index.md) (third-party source on `json_schema` support)
- [Ollama, structured outputs](https://registry.ollama.ai/blog/structured-outputs)
- Repo: `hack4edu_2026_Bases_de_participacion.md`, `docs/STATE.md`, `docs/research/gemma4.md`, `docs/review/criterios.md`
