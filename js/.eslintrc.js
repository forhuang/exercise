module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
        allowImportExportEverywhere: true,
    },
    rules: {
        indent: [
            'error',
            2,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'never',
        ],
        'react/jsx-filename-extension': 0,
        'react/no-array-index-key': 0,
        'no-nested-ternary': 0,
        'no-plusplus': 0,
        'react/jsx-props-no-spreading': 0,
        'import/no-cycle': 0,
        'react/react-in-jsx-scope': 0,
        'template-curly-spacing': 'off',
        indent: 'off',
    },
}
