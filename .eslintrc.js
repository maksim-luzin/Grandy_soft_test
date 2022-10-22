module.exports = {
  'extends': [
    'react-app',
  ],
  'ignorePatterns': 'build',
  'overrides': [
    {
      'files': ['**/*.ts?(x)'],
      'rules': {
        'prettier/prettier': ['error'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'indent': ['error', 2],
        'import/no-cycle': 'off',
        'object-curly-newline': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-use-before-define': 'off',
        'max-len': ['error', { 'code': 120 }],
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-multiple-empty-lines': ['error', { 'max': 1 }],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { 'argsIgnorePattern': '^_' }
        ],
        "import/prefer-default-export": "off",
        "react/button-has-type": "off",
        "implicit-arrow-linebreak": "off",
        "consistent-return": "off",
        "no-useless-return": "off",
        "operator-linebreack": "off"
      },
      'extends': [
        'prettier',
        'airbnb-typescript'
      ],
      'parser': '@typescript-eslint/parser',
      parserOptions: {
        'sourceType': 'module',
        'ecmaVersion': 'latest',
        'project': './tsconfig.json',
        'tsconfigRootDir': './'
      },
      'plugins': ['@typescript-eslint', 'eslint-plugin-prettier']
    }
  ]
}