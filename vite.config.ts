import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      nodePolyfills({
        globals: {
          Buffer: true,
        },
      }),
    ],
    base: isProduction ? "/" : "./",
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
    optimizeDeps: {
      include: ['buffer']
    },
    define: {
      'process.env': JSON.stringify(env),
      global: 'globalThis',
      'lit.dev': false
    },
    // server: {
    //   hmr: {
    //     host: 'emperorpresale.io', // Set to your domain name or public IP
    //   },
    // },
    build: {
      sourcemap: false,
      minify: "esbuild",
      outDir: "dist",
    },
  };
});
