module.exports = {
    'env': {
        'es6': true,
        'node': true,
        'browser': true
    },
    'root': true,
    "extends": [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',     
    ],
    'parser': '@typescript-eslint/parser',
    'plugins': [
        '@typescript-eslint',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2019,
        'sourceType': 'module'
    },
    'rules': {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
    
        // codestyle
        'arrow-spacing': ['error'],
        'prefer-arrow-callback': ['error'],
        'prefer-const': ['error'],
        'camelcase': ['error'],
        'comma-dangle': ['error', 'always-multiline'],
        'eol-last': ['error'],
        'key-spacing': ['error'],
        'no-trailing-spaces': ['error'],
        'handle-callback-err': ['error'],
        'max-len': ['warn', {code: 120}],
        "@typescript-eslint/explicit-function-return-type": ["off"]
    }
};