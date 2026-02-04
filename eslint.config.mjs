import { defineConfig } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import nextVitals from 'eslint-config-next/core-web-vitals'

const EslintConfig = defineConfig([
    ...nextVitals,
    js.configs.recommended,
    ...ts.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
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
            'react-hooks/set-state-in-effect': 'warn',
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
