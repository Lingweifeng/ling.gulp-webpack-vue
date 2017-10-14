s// webpack config: webpack配置文件
var projectName = 'demo',
    webpack = require( 'webpack' ),
    glob = require('glob'),
    path = require('path'),
    minimist = require( 'minimist' ),
    named = require( 'vinyl-named' ),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

// 根据项目具体需求，输出正确的 js 和 html 路径
function getEntry(globPath) {
    var entries = {}, basename, tmp, pathname;

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-2);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出 js 和 html 的路径
        entries[pathname] = entry;
    });
    return entries;
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var entries = getEntry( './src/**/*.js'); // 获得入口 js 文件
var chunks = Object.keys(entries);

// 获取命令行传递参数env，开发：gulp --env dev(默认)；生产：gulp --env production
var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'dev' }
};

var options = minimist(process.argv.slice(2), knownOptions);

//  外部框架CSS
const extractLib = new ExtractTextPlugin({
            publicPath: '/',
            filename: 'public/css/lib.css'
        });

//  公共commonCSS
const extractCommon = new ExtractTextPlugin({
            publicPath: '/',
            filename: 'public/css/[name].css'
        });

module.exports = {
    devtool: options.env == 'production'? false : '#source-map',
    entry: entries,
    watch: options.env == 'production'? false : true,
    output: {
        path: options.env == 'production'? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'dev'), // __dirname当前项目目录
        publicPath: '/',                  // html, css, js 图片等资源文件的 server 上的路径
        filename: 'public/js/[name].js'         // 每个入口 js 文件的生成配置
        //chunkFilename: 'public/js/[id].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                //loaders的处理顺序是从右到左的，这里就是先运行css-loader然后是style-loader
                use: extractCommon.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }, {
                test: /\.css$/,
                // use: [ 'style-loader', 'css-loader' ]
                use: extractLib.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: extractCommon.extract({
                            use: [ 'css-loader?minimize=true' ],
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        }),
                        scss: extractCommon.extract({
                            use: [ 'css-loader?minimize=true','sass-loader' ],
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            }, {
                test: /\.(png|jpg|gif|jpeg)$/, //处理css文件中的背景图片
                //当图片大小小于这个限制的时候，会自动启用base64编码图片。减少http请求,提高性能
                use: [{
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name: 'public/images/[name].[hash:7].[ext]'
                    }  
                }]
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                /* 排除模块安装目录的文件 */
                exclude: /node_modules/,
                options: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'public/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        /*new ExtractTextPlugin({
            publicPath: '/',
            filename: 'public/css/[name].css'
        }),*/
        extractLib,
        extractCommon,
        /*new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            chunks: ['common/index'],
            minChunks: 1
        }),*/
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            chunks: chunks,
            minChunks: chunks.length
        })
    ]
}

// 生产环境配置
if( options.env == 'production' ){
    module.exports.plugins.push( 
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

var pages = getEntry( './src/**/*.html');
for (var pathname in pages) {
    // 配置生成的 html 文件，定义路径等，区分开发环境及生产环境
    if( options.env == 'production' ){
        var conf = {
            filename: './' + pathname + '.html', // html 文件输出路径
            template: pages[pathname], // 模板路径
            inject: true,              // js 插入位置
            hash: true,
            minify: {
                removeComments: true,  //清除HTML注释
                //collapseWhitespace: true,  //压缩HTML
                collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input />
                //removeAttributeQuotes: true,  //尽可能地删除html属性的引号
                removeRedundantAttributes: true,  //当属性值是默认值时删除该属性
                useShortDoctype: true,  //doctype使用简短形式(h5)
                //removeOptionalTags: true,  //尽量移除不需要的闭合标签
                removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
                minifyJS: true,  //压缩页面JS
                minifyCSS: true  //压缩页面CSS
            }
        };
    }/*else if( options.env == 'static' ){
        var conf = {
            filename: './static/' + pathname + '.html', // html 文件输出路径
            template: pages[pathname], // 模板路径
            inject: true,              // js 插入位置
        };
    }*/else{
        var conf = {
            filename: './' + pathname + '.html', // html 文件输出路径
            template: pages[pathname], // 模板路径
            inject: true,              // js 插入位置
        };
    }
    if (pathname in module.exports.entry) {
        conf.chunks = ['commons', pathname];
    }
    // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}