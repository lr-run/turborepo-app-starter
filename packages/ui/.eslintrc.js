/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'tailwind.config.ts',
    'src/components/ui',
    'src/lib/utils.ts',
  ],
}
