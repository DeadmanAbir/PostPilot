import { defineConfig } from 'eslint/config';
import nodeConfig from '@repo/eslint-config/node';

export default defineConfig([
  ...nodeConfig,
  {
    files: ['**/*.{ts,js}'],
    ignores: ['dist/**', 'node_modules/**']
  }
]);
