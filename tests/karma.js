module.exports = function(config){
  config.set({

    basePath : '../',
    urlRoot: '/',

    files : [
      'src/*.spec.js',
    ],
    preprocessors: {
      'src/*.spec.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [ ['babelify', {optional: ['runtime' ] } ] ]
    },

    autoWatch : false,
    singleRun: true,
    port: '9876',
    reporters: ['spec'],
    loggers: [{
      type: 'console'
    }],

    frameworks: ['browserify', 'jasmine'],
    browsers: ['Chrome'],

    plugins : [
            require('karma-chrome-launcher'),
            require('karma-jasmine'),
            require('karma-spec-reporter'),
            require('karma-browserify')
            ],
  });
};
