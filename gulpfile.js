var gulp = require('gulp');
var babel = require('gulp-babel'); //es6识别
//var rename = require('gulp-rename');//重命名
//var uglify=require('gulp-uglify');//js压缩
//var minifyCss = require("gulp-minify-css");//压缩CSS
//var jshint = require("gulp-jshint");//js检查
//var concat = require("gulp-concat");//文件合并
//var autoprefixer = require("gulp-autoprefixer");//样式兼容前缀
var plugins = require('gulp-load-plugins')();

gulp.task('commoncss',function(){
    return gulp.src(['public/css/*.css','src/css/app_meeting.css'])
        .pipe(plugins.autoprefixer({overrideBrowserslist: ['last 2 versions', 'Android >= 4.0']}))
        .pipe(plugins.base64())
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat('newdetail.min.css'))
        .pipe(gulp.dest('dist/css'))
})
gulp.task('commonjs',function(){
    return gulp.src(['public/js/*.js', 'src/js/app_meeting.js'])
       .pipe(babel({presets: ["env"]}))
       .pipe(plugins.uglify())
       .pipe(plugins.concat('rem.js'))
       .pipe(gulp.dest('dist/js'))          
})

gulp.task('default',gulp.series(gulp.parallel('commoncss','commonjs')));
