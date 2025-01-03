import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Alternatively, suppress specific warnings
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        warn(warning); // Call default handler for other warnings
      },
    },
  },
});
