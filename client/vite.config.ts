/// <reference types="vite/client" />

import { defineConfig } from "vite";
import istanbul from "vite-plugin-istanbul";
import react from "@vitejs/plugin-react";
const path = require("node:path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "test/"],
      extension: [".js", ".ts", ".tsx"],
      requireEnv: true,
    }),
  ],
});
