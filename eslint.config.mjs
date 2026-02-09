import tseslint from '@typescript-eslint/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import boundaries from 'eslint-plugin-boundaries';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
    ...nextVitals,
    prettier, // Prettier config, disables conflicting rules
    {
        // Plugins -> External rule packages
        // Next.js 16 already comes with these rules: eslint-plugin-react, eslint-plugin-react-hooks, @next/eslint-plugin-next

        plugins: {
            prettier: prettierPlugin,
            'unused-imports': unusedImports,
            '@typescript-eslint': tseslint,
            'simple-import-sort': simpleImportSort,
            boundaries: boundaries,
        },

        rules: {
            'prettier/prettier': 'error',
            'unused-imports/no-unused-imports': 'error',

            // Ts rules
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            // Import sorting
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
