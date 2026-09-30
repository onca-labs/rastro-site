import type { NextConfig } from "next";

// Static export for GitHub Pages. The deploy workflow sets NEXT_PUBLIC_BASE_PATH
// from actions/configure-pages: "/rastro-site" on onca-labs.github.io, "" once a
// custom domain is configured. Locally it is "", so `yarn dev` serves from /.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
