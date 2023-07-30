import { defineConfig } from "vite";
const BASE = "/authvanilla/";
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? BASE : "/",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
});
