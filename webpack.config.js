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
    devtool: debug ? "inline-source-map" : null,
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'app'),
            assets: path.resolve(__dirname, 'assets'),
            npm: node_modules_dir,
            views: path.resolve(__dirname, 'views'),
            components: path.resolve(__dirname, 'views/components')
        }
    },
    entry: {
        app: './app/phenomenon.js',
        style: './stylesheets/style.scss',
        vendors: [ 'angular', 'jquery', 'angular-ui-router', 'bootstrap' ]
    },
    output: {
        filename: '[name]-bundle.min.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: path.resolve(__dirname, '/'),
        libraryTarget: "umd"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery'
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.dependencies.LabeledModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'views/index.jade',
            filename: 'index.html',
            title: 'Phenomenon'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourceMap: false
        })
    ],
    module: {
        noParse: [
            new RegExp('^react$'),
            new RegExp('^jquery$'),
        ],
        preloaders: [
            {test: /\.js$/, loader: "jshint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                },
                exclude: /node_modules/
            },
            { test: /[\/]angular\.js$/, loader: "exports?angular" },
            { loader: 'exports?window.angular', test: require.resolve('angular') },

            { test: /\.json$/, loader: "json-loader" },
            //{ test: /\.html$/,  loader: "html" },
            {
                test: /\.jade$/,
                loader: 'jade'
            },
            { test: /\.scss$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"] },
            { test: /\.css$/,   loader: "style-loader!css-loader!postcss-loader" },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
            { test: /\.png$/,   loader: "url-loader?prefix=img/&mimetype=image/png"},
            { test: /\.jpg$/,   loader: "url-loader?prefix=img/&mimetype=image/jpg"},
            { test: /\.gif$/,   loader: "url-loader?prefix=img/&mimetype=image/gif"}
        ],
    }
};

