import { defineConfig } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import nextPlugin from '@next/eslint-plugin-next'
import ts from 'typescript-eslint'

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

const EslintConfig = defineConfig([
    ...compat.config({
        extends: ['next']
    }),
    js.configs.recommended,
    ...ts.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
            '@next/next': nextPlugin,
        },
        languageOptions: {
            globals: {},
            parser: tsParser,
        },
        rules: {
            'eol-last': 'error',
            semi: ['warn', 'never'],
            quotes: ['warn', 'single', { allowTemplateLiterals: true }],
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': ['warn'],
            'prefer-const': 'off',
        },
    },
    {
        ignores: [
            'cypress/**/*',
            '.next/**/*',
        ]
    },
])

export default EslintConfig
