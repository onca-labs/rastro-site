import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount between tests to keep the DOM isolated.
afterEach(() => {
  cleanup();
});
