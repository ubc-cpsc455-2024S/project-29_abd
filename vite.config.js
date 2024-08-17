// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import envCompatible from 'vite-plugin-env-compatible';
//
//
// export default defineConfig({
//   plugins: [react(), envCompatible()],
//   define: {
//     'process.env': {}
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [react(), envCompatible()],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true, // Generates sourcemaps for easier debugging
    cssCodeSplit: true, // Ensures CSS is split per component where possible
  },
  base: '/', // Adjust base path if necessary
});

