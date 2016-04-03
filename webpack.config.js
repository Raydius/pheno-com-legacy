/**
 * Created by raydollete on 3/30/16.
 */

var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'app'),
            assets: path.resolve(__dirname, 'assets'),
            npm: node_modules_dir,
            views: path.resolve(__dirname, 'views')
        }
    },
    entry: {
        app: './app/phenomenon.js',
        style: './stylesheets/style.scss'
        /*vendors: [
            'angular', 'angular-cookies', 'angular-ui-router', 'angular-messages', 'angular-animate'
        ]*/

        //style: './src/stylesheets/style.scss',
        //index: './views/index.jade'
        //index: ['webpack/hot/dev-server', './index.js'],
        //page2: ['webpack/hot/dev-server', './page2.js'],
        //vendors: ['react', 'jquery'],
    },
    ProvidePlugin: {
        angular: 'angular',
        $: 'jquery'
    },
    output: {
        filename: '[name]-bundle.min.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: path.resolve(__dirname, '/'),
        libraryTarget: "umd"
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.dependencies.LabeledModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'views/welcome.jade',
            filename: 'index.html',
            title: 'Phenomenon'
        }),
        new HtmlWebpackPlugin({
            template: 'views/index.jade',
            filename: 'case-studies/index.html',
            title: 'Phenomenon Case Studies'
        })
        /*new webpack.optimize.UglifyJsPlugin({
         sourceMap: false,
         mangle: false
         })*/
    ],
    module: {
        noParse: [
            new RegExp('^react$'),
            new RegExp('^jquery$'),
        ],
        loaders: [
            { test: /\.js$/,    loader: "babel-loader" }, //, query: {optional: ["es7.classProperties"]}},
            //{ test: /\.html$/,  loader: "html" },
            { test: /\.jade$/, loader: 'jade'},
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            { test: /\.css$/,   loader: "style-loader!css-loader!postcss-loader" },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
            { test: /\.png$/,   loader: "url-loader?prefix=img/&mimetype=image/png"},
            { test: /\.jpg$/,   loader: "url-loader?prefix=img/&mimetype=image/jpg"},
            { test: /\.gif$/,   loader: "url-loader?prefix=img/&mimetype=image/gif"}
        ],
    },
    postcss: function() {
        return {
            defaults: [
                require('autoprefixer')
            ]
        }
    }
};

/*
 Object.keys(module.exports.entry).forEach(function(page){

 if(page!=='vendors'){
 module.exports.plugins.push( new HtmlWebpackPlugin({
 filename: page+'.html',
 chunks: [page]
 }) );
 }
 });*/