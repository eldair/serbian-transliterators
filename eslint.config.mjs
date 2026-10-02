import eslintPerfectionist from 'eslint-plugin-perfectionist';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    eslintPluginUnicorn.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    eslintPerfectionist.configs['recommended-line-length'],
    {files: ['**/*.js', '**/*.mjs'], extends: [tseslint.configs.disableTypeChecked]},
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'perfectionist/sort-objects': 'off',
            'perfectionist/sort-jsx-props': ['error', {type: 'alphabetical'}],
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'line-length',
                    order: 'desc',
                    groups: [
                        'type',
                        ['side-effect-style', 'side-effect'],
                        ['style'],
                        ['tsconfig-path'],
                        ['builtin', 'subpath', 'external'],
                        ['index', 'sibling', 'parent', 'internal'],
                        'import',
                        'unknown',
                    ],
                },
            ],
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/filename-case': 'off',
            'unicorn/no-null': 'off',
            'unicorn/explicit-length-check': 'off',
            'unicorn/no-await-expression-member': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/prefer-number-properties': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/prefer-string-raw': 'off',
            'unicorn/name-replacements': 'off',
            'unicorn/no-top-level-assignment-in-function': 'off',
            'unicorn/no-global-object-property-assignment': 'off',
            'unicorn/consistent-boolean-name': 'off',
            'unicorn/prefer-minimal-ternary': 'off',
            'unicorn/prefer-else-if': 'off',
            'unicorn/no-computed-property-existence-check': 'off',
            'unicorn/no-unreadable-for-of-expression': 'off',
            'unicorn/no-for-each': 'off',
            'unicorn/max-nested-calls': ['error', {max: 5}],
            'unicorn/prefer-await': 'warn',
            'unicorn/prefer-top-level-await': 'warn',
            'unicorn/prefer-number-coercion': 'warn',
            'unicorn/require-array-sort-compare': 'warn',
        },
    },
    eslintConfigPrettier,
);
