import baseConfig from './base.js';
import importPlugin from 'eslint-plugin-import';

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,js}'],
    plugins: {
      'import': importPlugin,
    },
    rules: {
      // Node.js specific rules
      'import/first': 'error',
      'import/no-cycle': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
];
