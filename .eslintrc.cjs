module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'import',
        'prettier',
        "react",
        "simple-import-sort"
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    rules: {
        'import/no-unresolved': 'error',
        "prettier/prettier": "error",
    },
    overrides: [
        {
            "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
            "rules": {
                "prettier/prettier": [
                    'error',
                    {
                        "singleQuote": true
                    }
                ],
                'import/order': [
                    'error',
                    {
                        "groups": ["builtin", "external", "parent", "sibling", "index"],
                        "pathGroups": [{
                            "pattern": "react",
                            "group": "external",
                            "position": "before"
                        }],
                        "pathGroupsExcludedImportTypes": ["react"],
                        'newlines-between': 'always',
                        alphabetize: {
                            order: 'asc',
                            caseInsensitive: false,
                        },
                    },
                ]
            }
        }
    ]
};