import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import solid from 'vite-plugin-solid';
import tailwindcss from "@tailwindcss/vite";
import { globSync } from "glob";
import {
  resolve,
  relative,
  extname,
} from "node:path";
import { copyFileSync } from "node:fs";

const componentsDir = resolve(
  process.cwd(),
  "src/components"
);

const input = Object.fromEntries(
  globSync("**/*.{ts,tsx}", {
    cwd: componentsDir,
    absolute: true,
  }).map((file) => {
    const relativePath = relative(
      componentsDir,
      file
    );
    const name = relativePath.slice(
      0,
      -extname(relativePath).length
    );
    return [name, file];
  })
);

const copyCss = () => ({
  name: "copy-css",
  writeBundle() {
    copyFileSync(
      "src/components/index.css",
      "dist/index.css",
    );
  },
});

export default defineConfig({
  plugins: [
    tailwindcss(),
    solid(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      include: ["src"],
      insertTypesEntry: true,
      exclude: [
        "**/*.test.ts",
        "**/*.test.tsx",
      ],
    }),
    copyCss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input,
      treeshake: false,
      external: [
        "solid-js",
        "solid-js/web",
      ],
      output: {
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "_chunks/[name]-[hash].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});