var gulp = require('gulp')
var gutil = require('gulp-util')
var bower = require('bower')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var minifyCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var sh = require('shelljs')

var usemin = require('gulp-usemin')
var uglify = require('gulp-uglify')
var minifyHtml = require('gulp-minify-html')
var rev = require('gulp-rev')

var paths = {
  sass: ['./scss/**/*.scss'],
  fonts: [
    'www/lib/ionic/fonts/ionicons.eot',
    'www/lib/ionic/fonts/ionicons.svg',
    'www/lib/ionic/fonts/ionicons.ttf',
    'www/lib/ionic/fonts/ionicons.woff',
  ]
}

gulp.task('default', ['sass'])

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done)
})

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass'])
})

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message)
    })
})

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      "\n  Once git is installed, run '" + gutil.colors.cyan('gulp install') + "' again."
    )
    process.exit(1)
  }
  done()
})

gulp.task('tpl', function () {
  return gulp.src('www/**/*.html')
    .pipe(gulp.dest('build/'))
})

gulp.task('font', function () {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('build/fonts/'))
})

gulp.task('usemin', function () {
  return gulp.src('www/index.html')
    .pipe(usemin({
      appcss: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      libjs: [rev()],
      appjs: [rev()]
    }))
    .pipe(gulp.dest('build/'))
})

gulp.task('img', function () {
  gulp.src(
    [
      'www/lib/photoswipe/dist/default-skin/default-skin.png',
      'www/lib/photoswipe/dist/default-skin/default-skin.svg',
      'www/lib/photoswipe/dist/default-skin/preloader.gif'])
    .pipe(gulp.dest('build/styles'))
})

gulp.task('build', ['usemin', 'tpl', 'font', 'img'])
