import react from '@vitejs/plugin-react'
import reiconify from '..'

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    react(),
    //
    reiconify(),
  ],
}
