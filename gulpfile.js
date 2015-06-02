'use strict';

var gulp = require('gulp'),
    p = require('./package.json'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    csso = require('gulp-csso'),
    cleanhtml = require("gulp-cleanhtml"),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    rename = require("gulp-rename"),
    sftp = require("gulp-sftp"),
    replace = require('gulp-replace'),
    cgiMock = require('connect-cgi-mock');

gulp.task('default', function() {
    gulp.start('server');
});

/*
 * 本地环境 local
 */
gulp.task('cleanDemo', function() {
    return gulp.src(['demo/js'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('scriptsDemo', function() {
    // gulp.src(['src/js/app/CMD.js', 'src/js/util/underscore.js', 
    //  'src/js/lib/Mobilebone.js', 'src/js/lib/Zepto.js', 'src/js/app/Model.js', 'src/js/app/Controller.js', 
    //  'src/js/util/template.js', 'src/js/util/defaults.js', 'src/js/util/Class.js'])
    gulp.src(['src/js/app/*.js', 'src/js/lib/*.js', 'src/js/util/*.js', 'src/js/ui/*.js'])
        .pipe(concat('MLBF.js'))
        .pipe(gulp.dest('demo/js'));
});

gulp.task('sassDemo', function() {
    return gulp.src('src/css/*')
        .pipe(gulp.dest('demo/css'));
});

gulp.task('imagesDemo', function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('demo/images'));
});

gulp.task('buildDemo', ['scriptsDemo', 'sassDemo', 'imagesDemo']);

gulp.task('server', ['buildDemo'], function() {
    connect.server({
        root: 'demo',
        port: 8888,
        livereload: true,
        middleware: function() {
            return [
                cgiMock({
                    root: __dirname + '/demo/cgiMock',
                    route: '/api'
                })
            ]
        }
    });
    require('opn')('http://localhost:8888/');
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['scriptsDemo']);
    gulp.watch('src/images/*.*', ['imagesDemo']);
    gulp.watch('src/css/*.*', ['sassDemo']);
    var server = livereload();
    gulp.watch('demo/**/**').on('change', function(file) {
        server.changed(file.path);
    });
});

/*
 * 发布
 */

gulp.task('scriptsDist', function() {
    return gulp.src(['demo/js/MLBF.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sassDist', function() {
    return gulp.src('src/css/*')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('imagesDist', function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('buildDist', ['scriptsDist', 'sassDist', 'imagesDist']);