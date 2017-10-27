var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var rename = require("gulp-rename");

gulp.task('clean', function(cb) {
    return gulp.src(['./web/js/dist'])
        .pipe(clean());

});

gulp.task('compress', ['clean'], function (cb) {
    pump([
            gulp.src('./web/js/scripts.js'),
            uglify(),
            rename('scripts.min.js'),
            gulp.dest('./web/js/dist/')
        ],
        cb
    );
});


gulp.task('scripts', ['compress'], function() {
    return gulp.src([
        './web/components/jquery/dist/jquery.min.js',
        './web/components/moment/min/moment.min.js',
        './web/components/bootstrap/dist/js/bootstrap.min.js',
        './web/components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
        './web/js/dist/scripts.min.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./web/js/dist/'));
});

gulp.task('default', ['scripts']);