import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Component tests only. The site is statically generated, so there's no
// server/API to exercise here: jsdom + Testing Library is enough to assert the
// landing page renders and its links point at the right places.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": new URL("./src", import.meta.url).pathname },
  },
});
