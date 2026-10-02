/**
@type {import("prettier").Config}
*/
export default {
    plugins: [],
    overrides: [
        {
            files: '*.yaml',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.yml',
            options: {
                tabWidth: 2,
            },
        },
    ],
    printWidth: 120,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: false,
    endOfLine: 'auto',
};
