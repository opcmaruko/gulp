var gulp = require('gulp')
var $ = require('gulp-load-plugins')();
var watch = require('gulp-watch');
// var jade = require('gulp-jade');
// var sass = require('gulp-sass');
// var plumber = require('gulp-plumber');
// var postcss = require('gulp-postcss');
var mainBowerFiles = require('main-bower-files')
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var minimist = require('minimist')
var gulpSequence = require('gulp-sequence')

var envOptions = {
    string: 'evn',
    default: { evn: 'develop' }
}
var options = minimist(process.argv.slice(2), envOptions)

gulp.task('clean', function() {
    return gulp.src(['./.tmp', './public'], { read: false })
        .pipe($.clean());
});

gulp.task('copyHTML', function() {
    return gulp.src('./source/**/*.html')
        .pipe(gulp.dest('./public/'))

})


gulp.task('jade', function() {
    //   var YOUR_LOCALS = {};
    return watch('./source/**/*.jade', { ignoreInitial: false }, function() {
        gulp.src('./source/**/*.jade')
            .pipe($.plumber())
            .pipe($.jade({
                pretty: true
            }))
            .pipe(gulp.dest('./public/'))
            .pipe(browserSync.stream())
    });
});

gulp.task('sass', function() {
    var plugins = [
        autoprefixer({ browsers: ['last 5 version', '>5%', 'ie 6'] })
    ];
    return watch('./source/sass/**/*.scss', { ignoreInitial: false }, function() {
        return gulp.src('./source/sass/**/*.scss')
            .pipe($.plumber())
            .pipe($.sourcemaps.init())
            .pipe($.sass().on('error', $.sass.logError))
            //以上已編譯完
            .pipe($.postcss(plugins))
            .pipe($.if(options.env === 'production', $.minifyCss()))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('./public/css'))
            .pipe(browserSync.stream())
    });
});

gulp.task('babel', () => {
    return gulp.src('./source/js/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.concat('all.js'))
        .pipe($.if(options.env === 'production', $.uglify({
            compress: {
                drop_console: true
            }
        })))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream())
});

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles({
            "overrides": {
                "vue": { // 套件名稱
                    "main": "dist/vue.js" // 取用的資料夾路徑
                }
            }
        }))
        .pipe(gulp.dest('./.tmp/vendors'))
    cb(err)
});


gulp.task('vendorsjs', ['bower'], function() {
    return gulp.src('./.tmp/vendors/**/*.js')
        // .pipe($.order([
        //     'jquery.js'
        // ]))
        .pipe($.concat('vendors.js'))
        .pipe($.if(options.env === 'production', $.uglify()))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('image-min', () =>
    gulp.src('./source/images/*')
    .pipe($.if(options.env === 'production', $.imagemin()))
    .pipe(gulp.dest('./public/images'))
);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./source/sass/**/*.scss', ['sass'])
    gulp.watch('./source/**/*.jade', ['jade'])
    gulp.watch('./source/js/**/*.js', ['babel'])
});

gulp.task('build', gulpSequence(['clean', 'jade', 'sass', 'babel', 'vendorsjs', 'image-min']))

gulp.task('default', ['jade', 'sass', 'babel', 'vendorsjs', 'browser-sync', 'watch']);