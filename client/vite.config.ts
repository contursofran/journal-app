/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("node:path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
