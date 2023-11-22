module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    indent: [
      'error',
      2,
      {
        MemberExpression: 1,
        SwitchCase: 1
      }
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'new-cap': [
      'error',
      {
        capIsNewExceptions: ['Given', 'Before', 'Then', 'Router', 'ObjectID']
      }
    ],
    eqeqeq: ['error', 'always'],
    'newline-after-var': ['error', 'always'],
    'one-var-declaration-per-line': ['error', 'always'],
    'one-var': [
      'error',
      {
        var: 'always',
        let: 'always',
        const: 'always'
      }
    ],
    'no-var': 'error',
    'no-param-reassign': 'error',
    'block-scoped-var': 'error'
  }
};
