module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier', 'prettier/standard'],
  rules: {
    // Only allow debugger in development
    'no-debugger': process.env.PRE_COMMIT ? 'warn' : 'off',
    // Only allow `console.log` in development
    'no-unused-vars': 0,
    eqeqeq: 0,
    'no-console': process.env.PRE_COMMIT
      ? ['warn', {allow: ['warn', 'error']}]
      : 'off',
    'prettier/prettier': 0,
  },
  overrides: [
    {
      files: ['src/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
      excludedFiles: 'app.config.js',
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
      },
      env: {
        browser: true,
      },
    },
    {
      files: ['**/*.unit.js'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
      },
      env: {jest: true},
      globals: {
        mount: false,
        shallowMount: false,
        shallowMountView: false,
        createComponentMocks: false,
        createModuleStore: false,
      },
    },
  ],
};
