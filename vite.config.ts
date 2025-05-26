import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/board-game/",
  build: {
    cssMinify: true,
    minify: "esbuild",
  },
});
