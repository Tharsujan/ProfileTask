import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // You can specify the path to your tailwind config if needed
      // config: './tailwind.config.js',
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
});
