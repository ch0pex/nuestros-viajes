import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Para GitHub Pages en el futuro: cambiar base a '/<nombre-del-repo>/'
export default defineConfig({
  plugins: [react()],
})
