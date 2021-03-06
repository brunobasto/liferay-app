'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var App = require('./lib/App');
var madvoc = require('madvoc-route');
var path = require('path');
var SoyTemplateEngine = require('./lib/SoyTemplateEngine');

gulp.task('serve', ['build'], function() {
  var app = new App();

  app.setTemplateEngine(new SoyTemplateEngine());

  gutil.log('Routing', gutil.colors.cyan('routes.txt'));
  app.setRouteConfigurator(new madvoc.RouteConfigurator('dist/routes.txt'));

  gutil.log('Serving static', gutil.colors.cyan('public/'));
  app.serveStaticFolder(path.join(process.cwd(), 'dist/public'));

  gutil.log('Compiling templates in', gutil.colors.cyan('dist/'));
  app.getTemplateEngine().precompileTemplates('dist', {}, function() {
    app.start();
    gutil.log('Serving', gutil.colors.cyan('http://localhost:' + app.getServerPort()));
  });
});
