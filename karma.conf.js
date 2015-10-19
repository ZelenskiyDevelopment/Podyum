// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/lodash/lodash.js',
      'client/bower_components/angular-socket-io/socket.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/ng-file-upload/ng-file-upload.js',
      'client/bower_components/ngstorage/ngStorage.js',
      'client/bower_components/angular-aria/angular-aria.js',
      'client/bower_components/angular-material/angular-material.js',
      'client/bower_components/angular-youtube-mb/src/angular-youtube-embed.js',
      'client/bower_components/angular-confirm-modal/angular-confirm.js',
      'client/bower_components/angular-ui-select/dist/select.js',
      'client/bower_components/angular-carousel/dist/angular-carousel.js',
      'client/bower_components/ng-backstretch/dist/ng-backstretch.min.js',
      'client/bower_components/angular-messages/angular-messages.js',
      'client/bower_components/nanoscroller/bin/javascripts/jquery.nanoscroller.js',
      'client/bower_components/angular-nanoscroller/scrollable.js',
      'client/bower_components/perfect-scrollbar/src/perfect-scrollbar.js',
      'client/bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js',
      'client/bower_components/angular-touch/angular-touch.js',
      'client/bower_components/angular-scroll-glue/src/scrollglue.js',
      'client/bower_components/angular-cropme/cropme.js',
      'client/bower_components/angular-superswipe/superswipe.js',
      'client/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
      'client/app/app.js',
      'client/app/app.coffee',
      'client/app/**/*.js',
      'client/lib/**/*.js',
      'client/app/**/*.coffee',
      'client/components/**/*.js',
      'client/components/**/*.coffee',
      'client/app/**/*.jade',
      'client/lib/**/*.jade',
      'client/components/**/*.jade',
      'client/app/**/*.html',
      'client/lib/**/*.html',
      'client/components/**/*.html'
    ],

    preprocessors: {
      '**/*.jade': 'ng-jade2js',
      '**/*.html': 'html2js',
      '**/*.coffee': 'coffee',
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
