var gulp = require("gulp");
var spawn = require('child_process').spawn;
var livereload = require("gulp-livereload");

var nodeApp;

gulp.task('server', function() {
  if (nodeApp) {
    nodeApp.kill();
  }
  nodeApp = spawn("node", ['app.js'], {
    stdio: 'inherit'
  });
  nodeApp.on('close', function(code) {
    if (code === 8) {
      gulp.log("Une erreur");
    }
  });
});

gulp.task('default', function() {
  gulp.run('server');
  livereload.listen({ start: true });
  gulp.watch(['*.html', '*.js', '*.css'], function() {
    gulp.run('server');
    gulp.src(['*.html', '*.js', '*.css']).pipe(livereload());
  });
});

process.on('exit', function() {
  if (nodeApp) {
    nodeApp.kill();
  }
});
