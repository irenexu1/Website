import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // or whatever plugin you actually use


export default defineConfig({
  base: '/Website/',
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.glb"],
  server: {
    watch: {
      ignored: ["**/src/pages/Home1.jsx"],
    },
  },
});
