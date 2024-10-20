/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API: string
  // Add more environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
