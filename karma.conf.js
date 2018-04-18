// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-mocha-reporter')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'cobertura', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['mocha'],
    reportSlowerThan: 100,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          // Required when running as root in Docker container:
          // https://github.com/karma-runner/karma-chrome-launcher/issues/158
          '--no-sandbox',
          // Testing showed increased memory was necessary to prevent Chrome disconnects in Docker:
          // https://github.com/karma-runner/karma-chrome-launcher/issues/137#issuecomment-324174286
          '--max_old_space_size=4096',
          // Testing showed this was also required, though it may become a no-op:
          // https://groups.google.com/a/chromium.org/forum/#!topic/chromium-discuss/kfhzPq_Al94
          '--disable-setuid-sandbox'
        ]
      }
    },
    singleRun: false
  });
};
