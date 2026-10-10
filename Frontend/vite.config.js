
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/LawConnect/",
  server: {
    port: 5173,
  },
});
