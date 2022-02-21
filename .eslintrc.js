module.exports = {
    extends: ['plugin:prettier/recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    env: {
        es6: true,
        browser: true,
    },
    rules: {
        'no-var': 'error',
        semi: 'error',
        indent: ['error', 4, {SwitchCase: 1}],
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
    },
};
