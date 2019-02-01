var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglifyes = require('gulp-uglify');
var uglify = require('gulp-uglifyes');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var webp = require('gulp-webp');
var htmlmin = require('gulp-htmlmin');
const {phpMinify} = require('@cedx/gulp-php-minify');


gulp.task('copy-php', function(done) {
    gulp.src('./*.php*')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('copy-include-php', function(done) {
    gulp.src('./include-php/*.php*')
        .pipe(gulp.dest('./dist/include-php'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('copy-query-php', function(done) {
    gulp.src('./query/*.php*')
        .pipe(gulp.dest('./dist/query'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('copy-images', function(done) {
    gulp.src('./images/**/*')
       // .pipe(webp())
        .pipe(gulp.dest('./dist/images'));
    done();
});

/*
gulp.task('copy-sw', function(done) {
    gulp.src('./sw.js')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
    done();
});


gulp.task('copy-ww', function(done) {
    gulp.src('./ww.js')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
    done();
});
*/

gulp.task('styles', function(done) {
    gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('styles-dist', function(done) {
    gulp.src('./sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('styles-add-dist', function(done) {
    gulp.src('./css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('scripts', function(done) {
    gulp.src('./js/*.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('scripts-dist', function(done) {
    pump([
        gulp.src('./js/*.js'),
        uglify({ 
            mangle: false, 
            ecma: 6 
        }),
        gulp.dest('./dist/js')
    ],
    done()
    );
});

gulp.task('watch:styles', function() {
    gulp.watch('./sass/**/*.scss', gulp.series('styles'));
});

gulp.task('watch:scripts', function() {
    gulp.watch('./js/**/*.js', gulp.series('scripts'));
});

gulp.task('watch:copy-images', function() {
    gulp.watch('./images/**/*', gulp.series('copy-images'));
});

gulp.task('watch:copy-php', function() {
    gulp.watch('./*.php*', gulp.series('copy-php'));
});

gulp.task('watch:copy-include-php', function() {
    gulp.watch('./include-php/*.php*', gulp.series('copy-include-php'));
});

gulp.task('watch:copy-query-php', function() {
    gulp.watch('./query/*.php*', gulp.series('copy-query-php'));
});

/*
gulp.task('watch:copy-sw', function() {
    gulp.watch('./sw.js', gulp.series('copy-sw'));
});

gulp.task('watch:copy-ww', function() {
    gulp.watch('./ww.js', gulp.series('copy-ww'));
});

*/

gulp.task('watch', gulp.series('copy-php','copy-include-php','copy-query-php','copy-images','styles','scripts', gulp.parallel('watch:styles','watch:scripts','watch:copy-images','watch:copy-include-php','watch:copy-php','watch:copy-query-php')));

gulp.task('dist', gulp.series('copy-php','copy-include-php','copy-query-php','copy-images','styles-dist','scripts-dist','styles-add-dist', function(done) {
    done(); 
}));

gulp.task('default', gulp.series('copy-php','copy-include-php','copy-query-php','copy-images','styles','scripts','watch', function(done) {
    browserSync.init({
        server: './dist'
    });
    done();
}));



