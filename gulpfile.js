/**
 * gulp工作流
 *TODO: 1)解决sass,cssmin全部文件编译压缩的问题2)watch gulpfilejs自动重启;
 * http://www.css88.com/doc/webpack2/guides/migrating/
 * http://vue-loader.vuejs.org/en/configurations/extract-css.html
 */
var projectName = 'demo',
    gulp = require( 'gulp' ),
    watch = require( 'gulp-watch' ),
    sass = require( 'gulp-sass' ),
    cssmin = require( 'gulp-cssmin' ),
    rename = require('gulp-rename'),
    browserSync = require( 'browser-sync' ).create(),
    reload = browserSync.reload,
    gulpWebpack = require( 'gulp-webpack' ),
    minimist = require( 'minimist' ),
    webpack = require( 'webpack' ),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    babel = require( 'gulp-babel' ),
    named = require( 'vinyl-named' ),
    clean = require('gulp-clean'),
    glob = require('glob'),
    path = require('path'),
    gutil = require("gulp-util"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    runSequence = require('run-sequence'); // 工作流,gulp task 执行顺序

var taskList = [

    {
        id: 1,
        text: '开发模式(监视文件自动刷新)',
        confirm: true,
        task: function (callBack) {
            runSequence( 'dev', callBack );
        }
    },
    {
        id: 2,
        text: '生产模式(合并打包MD5)',
        confirm: true,
        task: function (callBack) {
            //runSequence( 'watch', callBack );
        }
    }
];

gulp.task('dev', ['cssmin'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        startPath: "/assets/index.html"
    });
    //gulp.watch( "gulpfile.js", ['dev'] ); // 监听gulpfile.js
    gulp.watch( "/assets/sass/*.scss", ['cssmin'] ); // 监听SASS
    gulp.watch( "/assets/**/*.vue", function(){ console.log( 'vue changed!' ); } ); // 监听vue
    gulp.watch( ["/assets/**/*.html", "/assets/css/**/*.min.css", "/assets/js/**/*.js"], reload ); // 监听html/css/js
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task( 'sass', function() {
    return gulp.src( "/assets/sass/*.scss" )
        .pipe( sass({ outputStyle: 'expanded' }).on( 'error', function( err ){ console.log( err ); this.emit('end'); } ) ) // nested/expanded/compact/compressed
        .pipe( gulp.dest("/assets/css") )
        //.pipe( reload({stream: true}) );
});

// sass监控
gulp.task('sass:watch', function () {
  gulp.watch( "/assets/sass/*.scss", ['sass']);
});

// css压缩
gulp.task( 'cssmin', ['sass'], function() {
    return gulp.src( ["/assets/css/*.css", "!"+"/assets/css/*.min.css"] )
        .pipe(cssmin()) // nested/expanded/compact/compressed
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('/assets/css'))
        //.pipe(reload({stream: true}));
});

// 清除生成的html和js、css、图片等静态资源
gulp.task('clean:app', function () {
  return gulp.src( ['/application/views/**/*', '/public/**/*' ], {read: false})
    .pipe(clean());
});

// 从命令行传递参数
var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'dev' }
};

var options = minimist(process.argv.slice(2), knownOptions);

// 默认开发模式：gulp；生产模式要传入参数：gulp --env app
gulp.task('default', function() {
    webpack( require('./webpack.config.js'), function(err, stats) {
        /*if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            
        }));*/
    });
    browserSync.init({
        server: {
            baseDir: "./",
        },
        startPath: "application/views/index/index.html"
    });
    if( options.env != 'app' ){
        gulp.watch( "/assets/sass/*.scss", ['cssmin'] ); // 监听SASS
        gulp.watch( ["application/views/**/*.html", "public/css/**/*.css", "public/js/**/*.js"], reload ); // 监听html/css/js
    };
});