import baseConfig from './base.js';
import importPlugin from 'eslint-plugin-import';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import nodePlugin from 'eslint-plugin-node';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import globals from 'globals';
import { fixupPluginRules } from '@eslint/compat';

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,js}'],
    plugins: {
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
      node: fixupPluginRules(nodePlugin),
      promise: promisePlugin,
      security: securityPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.ts'] },
      },
    },
    rules: {
      // Import plugin rules
      'import/first': 'error',
      'import/no-cycle': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: false }],

      // Node.js plugin rules
      'node/no-missing-require': 'error',
      'node/no-deprecated-api': 'warn',
      'node/no-extraneous-import': 'error',
      'node/no-extraneous-require': 'error',
      'node/no-process-exit': 'error',
    

      // TypeScript plugin (syntax-only) rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],

      // Promise plugin rules
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',

      // Security plugin rules
      'security/detect-object-injection': 'warn',
      'security/detect-child-process': 'error',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-eval-with-expression': 'error',

      // General best practices
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
];
