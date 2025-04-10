import { defineConfig } from 'tsup';
import glob from 'fast-glob';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

const packagesDir = resolve(__dirname, '..');
const aiNodesDir = resolve(packagesDir, '@n8n', 'nodes-langchain');
const cliDir = resolve(packagesDir, 'cli');

// Define only a minimal subset of essential nodes to build
const essentialNodePaths = [
  'nodes/Cron/*.ts',
  'nodes/Webhook/*.ts',
  'nodes/Set/*.ts',
  'nodes/Function/*.ts',
  'nodes/If/*.ts',
  'nodes/Merge/*.ts',
  'nodes/NoOp/*.ts',
  'nodes/Start/*.ts'
];

// Only include essential nodes
const externalFiles = [
  ...(await Promise.all(essentialNodePaths.map(pattern => 
    glob(pattern, { cwd: __dirname, absolute: true })
  ))).flat()
];

export default defineConfig({
  entry: ['index.js'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: false,
  minify: true,
  splitting: false,
  sourcemap: false,
  external: ['@n8n/core', '@n8n/workflow'],
});
