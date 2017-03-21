var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: {
  	index: path.resolve(APP_PATH, './js/index.js'),
  	app: path.resolve(APP_PATH, './js/app.js'),
  	vendors: ['webpack-zepto']
  }, 
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename:  'js/[name].[chunkHash].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true/*,
    progress: true*/
  },
  //代码出错后会采用source-map的形式直接显示你出错代码的位置
	devtool: 'eval-source-map',
  module: {
    loaders: [
      {
      	test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        include:APP_PATH
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/, 
        loader: 'url-loader?limit=4000&name=img/[name].[ext]'  //limit,图片大小小于这个限制的时候，会自动启用base64编码图片
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.CommonsChunkPlugin({
    	//name:'vendors', filename:'js/[name]-[hash].js'
    	name: ['common','vendors','manifest']
    }),
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(APP_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['common','index','vendors','manifest'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'New Hello World app',
      template: path.resolve(APP_PATH, 'app.html'),
      filename: 'app.html',
      chunks: ['common','app','vendors','manifest'],
      inject: 'body'
    })
  ],
  externals:{
  	"jquery":"Jquery"
  }
};