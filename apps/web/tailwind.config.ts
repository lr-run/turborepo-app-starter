import baseConfig from '@repo/ui/tailwind.config'
import type { Config } from 'tailwindcss'

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  presets: [baseConfig],
} satisfies Config
