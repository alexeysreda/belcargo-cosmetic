const gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify');

// перемещаем файлы в src
gulp.task('moveFiles', async () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/*.png')
        .pipe(gulp.dest('dist'));
    gulp.src('src/*.ico')
        .pipe(gulp.dest('dist'));
    gulp.src('src/mailsendmailer/*.php')
        .pipe(gulp.dest('dist/mailsendmailer'));
    gulp.src('src/styles/reset.css')
        .pipe(gulp.dest('dist/styles'));
    gulp.src('src/styles/tingle.min.css')
        .pipe(gulp.dest('dist/styles'));
    gulp.src('src/js/tingle.min.js')
        .pipe(gulp.dest('dist/js'));
    gulp.src('src/styles/fonts/*')
        .pipe(gulp.dest('dist/styles/fonts'));
});

// сжимаем изображения
gulp.task('imagemin', () => {
    return gulp.src('src/img/*/*.{png,jpg,jpeg,gif,svg}*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// stylus в css
gulp.task('stylus', () => {
    return gulp.src('src/styles/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('dist/styles'));
});

// автопрефиксер
gulp.task('autoprefixer', () =>
    gulp.src('dist/styles/*.css')
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/styles'))
);

// чистим css
gulp.task('cleanCSS', () => {
    return gulp.src('dist/styles/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/styles'));
});

// прогоняем js через babel
gulp.task('babel', () =>
    gulp.src('src/js/script.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
);

// сжимаем js через uglify
gulp.task('uglify', () => {
    return gulp.src('dist/js/script.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});




// gulp: в продакшн, папка dist
gulp.task('production', gulp.series('imagemin', 'moveFiles','stylus', 'autoprefixer', 'cleanCSS', 'babel', 'uglify'));
