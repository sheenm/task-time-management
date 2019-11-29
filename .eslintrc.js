// TODO figure out if I need member ordering rule
// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'project': './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': [
      'warn',
      'stroustrup',
      {
        allowSingleLine: true
      }
    ],
    '@typescript-eslint/class-name-casing': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-array-constructor': 'warn',
    // Have to figure out about private methods
    // '@typescript-eslint/member-naming': [
    //   'warn',
    //   {
    //     'private': '^_'
    //   }
    // ],
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': ['warn', {
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreEnums: true,
      ignoreArrayIndexes: true
    }],
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unnecessary-condition': ['warn', {
      ignoreRhs: true
    }],
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    // '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    // '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    'quotes': 'off',
    '@typescript-eslint/quotes': [
      'warn',
      'single'
    ],
    '@typescript-eslint/restrict-plus-operands': 'warn',
    'semi': 'off',
    '@typescript-eslint/semi': [
      'warn',
      'never'
    ],
    // '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/type-annotation-spacing': [
      'warn',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true
          }
        }
      }
    ],
    '@typescript-eslint/unified-signatures': 'warn',
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/space-before-function-paren': ['warn', 'never'],
    '@typescript-eslint/typedef': 'off'
  }
}
