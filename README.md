基于vue的gulp+webpack开发框架
---------------------------------------------------------------------------
一.下载所有依赖包：
```
npm install --save-dev
```
二.进入开发模式：
```
gulp || gulp --env dev
```
监测.vue文件，自动执行webpack打包文件到dev；同步监测html/js/css文件，自动刷新浏览器<br>

三.进入打包模式，页面视图打包到application文件夹；静态资源打包到public文件夹：
```
gulp build
```
1.页面视图自动生成并引用压缩文件(js/css生成带md5后缀的静态文件引用)<br>
2.images文件夹图片压缩<br>
3.小图片使用base64(详见首页示例)