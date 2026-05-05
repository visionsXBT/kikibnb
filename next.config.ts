import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Avoid picking a parent folder lockfile as the tracing root on Windows.
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
