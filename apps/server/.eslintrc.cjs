/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'node_modules',
    'dist',
    'src/__generated__',
    'db/types.ts',
  ],
}
