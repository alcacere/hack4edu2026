import { defineConfig, loadEnv, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

// Sin backend: el navegador habla con Ollama a través de este proxy (/llm → LLM_BASE_URL).
// Así no hay problemas de CORS y la URL real solo vive en .env.
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, root, ''), ...process.env }
  const target = env.LLM_BASE_URL || 'http://localhost:11434/v1'
  const proxy: Record<string, ProxyOptions> = {
    '/llm': {
      target,
      changeOrigin: true,
      rewrite: (p: string) => p.replace(/^\/llm/, ''),
      configure: (p) => {
        p.on('proxyReq', (req) => req.removeHeader('origin'))
      },
    },
  }
  return {
    root: 'app',
    envDir: root,
    // Solo se exponen al navegador estas variables (ninguna es secreta).
    envPrefix: ['LLM_', 'DEMO_MODE', 'VITE_'],
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@ai': `${root}ai`,
        '@fixtures': `${root}fixtures`,
      },
    },
    server: { port: 5173, proxy, fs: { allow: [root] } },
    preview: { port: 4173, proxy },
    build: { outDir: `${root}dist`, emptyOutDir: true },
  }
})
