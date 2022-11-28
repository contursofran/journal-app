/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
const path = require("node:path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
});
