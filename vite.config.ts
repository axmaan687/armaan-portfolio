import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/armaan-portfolio/", 
  tanstackStart: {
    // This tells the framework to generate static files instead of a server entry
    output: "static", 
  },
  vite: {
    build: {
      outDir: "dist",
    }
  }
});