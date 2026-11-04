# Ficha del modelo: Gemma 4 (E2B y E4B)

Issue #7 · researcher · 2026-11-04 · Fuentes consultadas el 2026-11-04.
Contexto: DECISIÓN del 2026-11-04 (Ariel): **un solo modelo, Gemma 4**. Tag por defecto `gemma4:e2b`; `gemma4:e4b`, solo si se mide en la máquina nueva y un humano lo aprueba (`docs/STATE.md`).

**Leyenda.** **[V] verificado**: comprobado hoy en una fuente primaria (Google o Hugging Face) o en el registro de Ollama. **[M] medido por el equipo**: dato propio, con el issue de origen. **[sin verificar]**: no hay cifra oficial o no la he podido comprobar.

## Ficha

| | `gemma4:e2b` (por defecto) | `gemma4:e4b` |
|---|---|---|
| Autor | Google DeepMind [V] | Google DeepMind [V] |
| Licencia | **Apache 2.0** [V]: la indican la ficha de Hugging Face (`license: apache-2.0`) y el blog de lanzamiento, y la capa `license` del tag de Ollama es el texto de Apache 2.0 | **Apache 2.0** [V], con las mismas fuentes |
| Parámetros | 2,3 B efectivos (5,1 B con las *embeddings* por capa) [V] | 4,5 B efectivos (8 B con *embeddings*) [V] |
| Tamaño en disco, tag de Ollama (GGUF Q4_K_M) | **4,59 GB** en total: pesos 3,50 GB, proyector multimodal 0,99 GB y modelo *draft* 0,10 GB [V, manifiesto del registro] | **6,58 GB** en total: pesos 5,49 GB, proyector 0,99 GB y *draft* 0,10 GB [V, manifiesto del registro] |
| Tamaño en disco, pesos originales bf16 (Hugging Face) | 10,2 GB en *safetensors* [V, API de HF] | 16,0 GB en *safetensors* [V, API de HF] |
| RAM necesaria | **Google no publica una cifra** [sin verificar]. [M] Funciona en CPU con 7,6 GB de RAM y sin GPU, pero con *swap* en uso: 3,1 s en caliente, 14,6 tok/s y unos 2 min en frío (#1). Estimación propia: unos 5–6 GB entre pesos y caché de contexto [sin verificar] | Sin cifra oficial [sin verificar]. Por tamaño, previsiblemente **más de 7 GB**; el builder no lo descargó en la máquina de 7 GB (#1). En la máquina actual (30 GB) debería caber, **pero no está medido** |
| Contexto | 128K tokens [V] | 128K tokens [V] |
| Entrada / salida | Texto, imagen y audio (hasta 30 s) → texto [V] | Igual que E2B [V] |
| Idiomas | Preentrenado en más de 140 lenguas y con soporte «out-of-the-box» para más de 35 [V]. Google no publica la lista de esas 35, así que **no he podido confirmar el español por nombre** [sin verificar] | Igual que E2B [V] / [sin verificar] |
| Español en la práctica | [M] Responde en español correcto con nuestro prompt (`fixtures/hola.json`, generado por `gemma4:e2b`). Es **una sola respuesta**, no una evaluación | No probado |
| Indicador multilingüe | MMMLU (MMLU traducido a varias lenguas) 67,4 % [V, ficha del modelo]. Google no da el desglose por idioma | MMMLU 76,6 % [V] |
| Razonamiento | Modo *thinking* configurable [V]. En E2B y E4B, al desactivarlo no se genera el bloque de pensamiento [V, página de Ollama] | Igual que E2B [V] |
| Versión mínima de Ollama | 0.30.9, según la configuración del tag [V] | 0.30.9 [V] |

Fuentes: [ficha en Hugging Face, `google/gemma-4-E2B-it`](https://huggingface.co/google/gemma-4-E2B-it) (y [E4B](https://huggingface.co/google/gemma-4-E4B-it)); [blog de lanzamiento de Google, 2 de abril de 2026](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/); [Ollama, `library/gemma4`](https://ollama.com/library/gemma4) y su registro (`registry.ollama.ai/v2/library/gemma4/manifests/{e2b,e4b}`: tamaño de cada capa, `file_type: Q4_K_M`, `requires: 0.30.9`); [Gemma 4 Technical Report, arXiv 2607.02770](https://arxiv.org/abs/2607.02770) (solo he leído el resumen). La página de licencia de `ai.google.dev` no cargó desde aquí (*timeout*), así que la licencia está confirmada por las otras tres fuentes.

**Cómo comprobar el tamaño en disco:**

```bash
curl -s -H 'Accept: application/vnd.docker.distribution.manifest.v2+json' \
  https://registry.ollama.ai/v2/library/gemma4/manifests/e2b
```

Sumar el campo `size` de cada elemento de `layers`. En local, `ollama list` dentro del contenedor da la misma cifra.

## Lo que falta medir (para el builder, en la máquina nueva)

- RAM real en uso con `docker stats ollama` durante una respuesta de `e2b`, y lo mismo con `e4b` si se descarga.
- Si se prueba `e4b`: latencia en caliente y tok/s, para que un humano decida con datos (`docs/STATE.md`).
- Calidad del español con los escenarios E1–E10 del reviewer (`docs/review/escenarios.md`); esto sustituye a la verificación «por lista» que Google no publica.

## Por qué no comparamos con otros modelos

- **Ya está decidido.** El 2026-11-04 un humano eligió un único modelo y se descartaron el selector y Qwen (`docs/STATE.md`). Comparar ahora no cambiaría el producto y costaría horas.
- **El pitch no es «el mejor modelo».** Es «coste 0, privado y offline, con un modelo abierto y local». Para eso basta con demostrar que Gemma 4 E2B cumple tres cosas: licencia permisiva (Apache 2.0 [V]), que cabe en un portátil normal ([M]: funciona con 7,6 GB) y que responde en español ([M]).
- **Una comparación seria no cabe en el hackathon.** Exigiría la misma batería de escenarios en español, en la misma máquina y con varias ejecuciones. Los *benchmarks* de los fabricantes no sirven para eso: no se miden en español ni con nuestras tareas.
- **Riesgo que se acepta:** puede que otro modelo pequeño dé mejores respuestas en español. Lo mitiga el prompt y los escenarios E1–E10. Si Gemma 4 E2B suspende escenarios por el idioma, se reabre la cuestión con un `BLOQUEO:`.
