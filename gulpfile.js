var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var del = require('del');
var os = require('os');
var open = require('gulp-open');

// Get os browser
var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
    os.platform() === 'win32' ? 'chrome' : 'firefox'));

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('default', function() {
    // Open application based on os
    gulp.src('src/index.html')
    .pipe(open({app: browser}));
    // Watch for sass changes
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('run', function () {
    // Open application based on os
    gulp.src('src/index.html')
    .pipe(open({app: browser}));
    // Watch for sass changes
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
    gulp.src('src/sass/**/*.{sass,scss}')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css/'));
});

gulp.task('clean:public', function () {
    return del([
        'public/**/*',
    ]);
});

gulp.task('uglify', ['clean:public'], function() {
    gulp.src('src/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('copy', ['uglify'], function () {
    return gulp.src([
        'src/*.html',
        'src/assets/css/*.css',
        'src/assets/images/**/*'
    ], { base: 'src' })
        .pipe(gulp.dest('public'));
});

gulp.task('build', ['copy']);
