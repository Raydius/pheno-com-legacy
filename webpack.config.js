/**
 * Created by raydollete on 3/30/16.
 */

// base dependencies
var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebPackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    node_modules_dir = path.resolve(__dirname, 'node_modules');



// set boolean debug variable based on whether or not this is a prod environment
var debug = process.env.NODE_ENV !== 'production';

// default host/port configuration (must override for non-local deployments)
var host = 'http://127.0.0.1',
    port = 9000,
    output_dir = 'public';

// allow environment variables to override default host/port
if(process.env.OUTPUT_HOST) {
    host = process.env.OUTPUT_HOST;
}
if(process.env.OUTPUT_PORT) {
    port = process.env.OUTPUT_PORT;
}
if(process.env.OUTPUT_DIR) {
    output_dir = process.env.OUTPUT_DIR;
}

// construct publicPath string
var publicPath = (port == 80) ? host+'/' : host+':'+port+'/';

// set Google Analytics config
var gaConfig = {
    trackingId: 'UA-51195233-1',
    pageViewOnLoad: true
};

var express = require('express');
var app = express();

app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000'));


// dynamically generate plugins config based on environment needs
function getPlugins() {

    // base plugin config
    var plugins = [

		// expose environment key to webpack
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': process.env.NODE_ENV
            }
        }),

		// allow some modules to be accessible globally without 'require'
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			"window.jQuery": 'jquery'
		}),

		// create vendors.js
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

		// support labeled modules
		new webpack.dependencies.LabeledModulesPlugin(),

		// build central CSS sheet
		new ExtractTextPlugin('styles.css'),

		// generate index.html as public entry point based on index.pug template
		new HtmlWebpackPlugin({
			template: 'views/index.pug',
			filename: 'index.html',
			title: 'phenomenon - Innovations Company | Marketing, UX, Digital, Cultural Innovation',
			googleAnalytics: gaConfig
		})

	];

    // conditional production plugins
    if(!debug) {

        // minify JS files
        plugins.push(new webpack.optimize.UglifyJsPlugin());

        // minify CSS files
		plugins.push(new OptimizeCssAssetsPlugin({
			assetNameRegExp: debug ? /\.optimize.css$/g : /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}));
    }

    return plugins;
}




// main webpack module
module.exports = {
    context: __dirname,
    devtool: debug ? "inline-source-map" : null,
    debug: debug,
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
        // entry point for main JS application
        app: './app/phenomenon.js',
        // entry point for stylesheets
        style: './stylesheets/style.scss',

        // vendor JS files to be separated into vendors.js
        vendors: [
            'angular', 'jquery', 'angular-ui-router', 'bootstrap', 'angular-cookies', 'angular-messages', 'angular-snap',
            'angular-socialshare', 'angular-sanitize', 'angular-environment'
        ]
    },
    output: {
        filename: '[name]-bundle.min.js',
        path: path.resolve(__dirname, output_dir),
        publicPath: publicPath,
        libraryTarget: "umd"
    },
    plugins: getPlugins(),
    module: {
        noParse: [
            new RegExp('^react$'),
            new RegExp('^jquery$'),
        ],
        preloaders: [
            {test: /\.js$/, loader: "jshint-loader", exclude: /node_modules/}
        ],
        loaders: [

            // ES6 transpiling loader
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

            // jade/pug template loader
            {
                test: /\.(jade|pug)$/,
                loader: 'pug'
            },

            // SASS loader
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(["css?sourceMap", "sass?sourceMap"])
            },
            { test: /\.css$/,   loader: "style-loader!css-loader!postcss-loader" },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },

            // image loader with optimization
            {
                test: /.*\.(gif|png|jpe?g)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            }
        ],
    }
};
