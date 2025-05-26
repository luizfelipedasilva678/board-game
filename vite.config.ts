import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    cssMinify: true,
    minify: "esbuild",
  },
});
