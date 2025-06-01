import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit (optional)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Moves dependencies to a separate file
          }
        },
      },
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensures JSX is handled
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
});
