/**
 * gulp工作流
 *TODO: 1)整合路由：vue-router
        2)雪碧图spritesmith;
        3)watch gulpfilejs自动重启;
 * http://www.css88.com/doc/webpack2/guides/migrating/
 * http://vue-loader.vuejs.org/en/configurations/extract-css.html
 */
var projectName = 'demo',
    gulp = require( 'gulp' ),
    watch = require( 'gulp-watch' ),
    sass = require( 'gulp-sass' ),
    cssmin = require( 'gulp-cssmin' ),
    imagemin = require('gulp-imagemin'),
    gulpif = require("gulp-if"),
    spritesmith = require("gulp-spritesmith"),
    rename = require('gulp-rename'),
    browserSync = require( 'browser-sync' ).create(),
    proxy = require('http-proxy-middleware'),
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
        startPath: "/src/index.html"
    });
    //gulp.watch( "gulpfile.js", ['dev'] ); // 监听gulpfile.js
    gulp.watch( "/src/sass/*.scss", ['cssmin'] ); // 监听SASS
    //gulp.watch( "/src/**/*.vue", function(){ console.log( 'vue changed!' ); } ); // 监听vue
    gulp.watch( ["/src/**/*.html", "/src/css/**/*.min.css", "/src/js/**/*.js"], reload ); // 监听html/css/js
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task( 'sass', function() {
    return gulp.src( "/src/sass/*.scss" )
        .pipe( sass({ outputStyle: 'expanded' }).on( 'error', function( err ){ console.log( err ); this.emit('end'); } ) ) // nested/expanded/compact/compressed
        .pipe( gulp.dest("/src/css") )
        //.pipe( reload({stream: true}) );
});

// sass监控
gulp.task('sass:watch', function () {
  gulp.watch( "/src/compenents/common/sass/*.scss", ['sass']);
});

// css压缩
gulp.task( 'cssmin', ['sass'], function() {
    return gulp.src( ["/src/css/*.css", "!"+"/src/css/*.min.css"] )
        .pipe(cssmin()) // nested/expanded/compact/compressed
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('/src/css'))
        //.pipe(reload({stream: true}));
});

// css sprite
gulp.task('sprite', function () {
    return  gulp.src( './src/components/common/images/sprite/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            styleName: 'sprite.scss',
            imgPath: '../images/sprite.png',
            // cssFormat: 'css',
            // Prefix all sprite names with `sprite-` (e.g. `home` -> `sprite-home`)
            cssVarMap: function (sprite) {
              sprite.name = 'sprite' + sprite.name;
            }
        }))
        .pipe(gulpif('*.png', gulp.dest('src/components/common/images/')))
        .pipe(gulpif('*.scss', gulp.dest('src/components/common/sass/')));
});

// 清除生成的html和js、css、图片等静态资源
gulp.task('clean', function () {
  return gulp.src([ 'dist/'], {read: false})
    .pipe(clean());
});

// 获取从命令行传递参数区分是开发环境（gulp --env dev）还是生产环境（gulp --env production）
var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'dev' }
};

var options = minimist(process.argv.slice(2), knownOptions);

// 默认开发模式：gulp；static环境：gulp --env static; 生产模式要传入参数：gulp --env production
gulp.task('webpack', [ 'clean' ], function() {
    webpack( require('./webpack.config.js'), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true,
            chunks: false
        }));
    });
    // 跨域
    const apiProxy = proxy('/open', // 接口需要代理的公用部分：‘/open’
        {
            target: 'http://10.8.34.17/open', // 此处需要改为相应api接口
            changeOrigin: true,
            ws: true,
            pathRewrite: {
            '^/open': ''
        }
    });
    // 开发环境：启动browserSync服务器监测文件变化
    if( options.env != 'production' ){
        browserSync.init({
            server: {
                baseDir: "dev",
                index: "index.html",
                middleware: [
                  apiProxy
                ]
            },
            startPath: "index"
        });
        //gulp.watch( "./src/**/*.scss", ['cssmin'] ); // 监听SASS
        gulp.watch( "./src/components/common/images/sprite/*.png", ['sprite'] ); // 监听sprite,自动生成雪碧图
        gulp.watch( ["./dev/**/*.html", "./dev/public/css/**/*.css", "./dev/public/js/**/*.js"], reload ); // 监听html/css/js
    // 纯静态环境：目录结构简化
    }
    // else if( options.env == 'static' ){
    //     browserSync.init({
    //         server: {
    //             baseDir: "./",
    //         },
    //         startPath: "static/index/index.html"
    //     });
    //     gulp.watch( "/src/**/*.scss", ['cssmin'] ); // 监听SASS
    //     gulp.watch( ["static/application/views/**/*.html", "static/public/css/**/*.css", "static/public/js/**/*.js"], reload ); // 监听html/css/js
    // // 线上环境：目录结构复杂
    // }
    else{
        browserSync.init({
            server: {
                baseDir: "./dist/",
                index: "index.html",
                middleware: [
                  apiProxy
                ]
            },
            startPath: "index"
        });
    };
});

// 执行默认命令
gulp.task('default', ['webpack'], function () {
    // 图片压缩
    return gulp.src( "dist/public/images/**/*" )
        .pipe(imagemin())
        .pipe( gulp.dest( "dist/public/images/" ) )

    browserSync.reload;
});