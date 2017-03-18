var gulp = require('gulp')
var less = require('gulp-less')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var path = require('path')



gulp.task('css', function(){
  return gulp.src(
    [
			'./public/assets/css/sweetalert.css',
			'./public/assets/css/blocks.css',
			'./public/assets/plugins/bootstrap/css/bootstrap.min.css',
			'./public/assets/css/style.css',
			'./public/assets/css/headers/header-default.css',
			'./public/assets/css/footers/footer-v1.css',
			'./public/assets/plugins/animate.css',
			'./public/assets/plugins/line-icons/line-icons.css',
			'./public/assets/plugins/font-awesome/css/font-awesome.min.css',
			'./public/assets/plugins/fancybox/source/jquery.fancybox.css',
			'./public/assets/plugins/sky-forms-pro/skyforms/css/sky-forms.css',
			'./public/assets/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms.css',
			'./public/assets/css/theme-colors/default.css',
			'./public/assets/css/theme-skins/dark.css',
			'./public/assets/css/pages/page_log_reg_v3.css',
			'./public/assets/css/custom.css'

    ]
  )
  .pipe(minifyCSS())
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
  .pipe(gp_concat('style.min.css'))
  .pipe(gulp.dest('./public/build/css/'))
})

gulp.task('build', function(){
  return gulp.src(
		[
			'./public//assets/js/sweetalert.min.js'
		]
	)
  .pipe(gp_concat('gulp-concat.js'))
  .pipe(gulp.dest('./public/min/'))
  .pipe(gp_rename('vendor.min.js'))
  .pipe(gp_uglify())
  .pipe(gulp.dest('./public/build/'));
})

gulp.task('copy', function(){
  return gulp.src(
    [
			'./public/assets/plugins/font-awesome/fonts/**',
			'./public/assets/plugins/line-icons/fonts/**'
		]

  )
	.pipe(gulp.dest('./public/build/fonts/'))
})

gulp.task('image', function(){
  return gulp.src(
    [
			'./public/img/bg/**'
		]

  )
	.pipe(gulp.dest('./public/build/img/bg'))
})

gulp.task('watch', function(){
    gulp.watch(['./src/*/**.js]', './src/*/*/**.js', './src/*/*/*/**.js'], ['css', 'build','image'])
});

gulp.task('prod', ['css', 'copy','image', 'build','watch'], function(){})

gulp.task('default', ['css', 'copy', 'image','build'], function(){})
