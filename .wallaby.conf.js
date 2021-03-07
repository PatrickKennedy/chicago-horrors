module.exports = wallaby => {
  process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true

  const compiler = wallaby.compilers.babel({
    presets: [['@vue/cli-plugin-babel/preset', { modules: 'commonjs' }]],
  })

  return {
    files: ['src/**/*', 'jest.config.js', 'package.json'],

    tests: ['tests/**/*.spec.js'],

    env: {
      type: 'node',
    },

    compilers: {
      '**/*.js': compiler,
      '**/*.vue': require('wallaby-vue-compiler')(compiler),
    },

    preprocessors: {
      '**/*.vue': file =>
        require('vue-jest').process(
          file.content,
          file.path,
          require('./package').jest || require('./jest.config')
        ),
    },

    setup: function(wallabyjs) {
      const jestConfig = require('./package').jest || require('./jest.config')
      jestConfig.transform = {}
      wallabyjs.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',
  }
}
