# fixtures/

Respuestas grabadas para `DEMO_MODE=1` (sin modelo ni red). Un fichero por flujo: `hola`, `perfil`, `plan`, `reflexion`.

Formato:
```json
{
  "flow": "plan",
  "version": 1,
  "origen": "cómo se obtuvo (modelo y fecha, o «escrito a mano»)",
  "entries": [
    { "key": "default", "text": "…", "recordedModel": "gemma4:e2b" | null, "recordedTokensPerSec": 12.3 | null }
  ]
}
```

Reglas: 100 % sintético, nombres ficticios («Docente A»), nada de datos de alumnos. No inventes métricas: si el texto no salió de un modelo, `recordedModel` y `recordedTokensPerSec` van a `null`.
