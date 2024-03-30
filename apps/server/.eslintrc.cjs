/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@lr/eslint-config/node.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'node_modules',
    'dist',
    'src/__generated__',
    'src/db/types.ts',
  ],
}
