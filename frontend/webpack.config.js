/* jshint -W106, -W079 */

const Promise = require('es6-promise').Promise;
const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const DEV_SERVER = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9000
};

const PLUGINS = {
    globals: new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',

        rangy: 'rangy',
        'window.rangy': 'rangy'
    }),
    html: new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html', // Load a custom template
        inject: 'body' // Inject all scripts into the body
    }),
    clean: new Clean([PATHS.build]),
    extractCss: new ExtractTextPlugin('assets/css/styles-[hash].css', {
        allChunks: true
    }),
    deduplication: new webpack.optimize.DedupePlugin(),
    uglify: new webpack.optimize.UglifyJsPlugin(),
    onTest: new webpack.DefinePlugin({
        ON_TEST: TARGET === 'test'
    })
};

const common = {
    context: PATHS.app,
    entry: {
        app: './app/app.ts'
    },

    output: {
        path: PATHS.build,
        pathinfo: true
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        loaders: [{
            test: /\.js$/,
            include: [PATHS.app],
            loader: 'ng-annotate!babel!jshint'
        }, {
            test: /\.ts?$/,
            include: [PATHS.app],
            loader: 'ng-annotate!babel!ts-loader?sourceMap'
        }, {
            test: /\.html$/,
            include: [PATHS.app],
            loader: 'ngtemplate?relativeTo=' + __dirname + '/src' + '!html'
        }]
    },

    jshint: {
        emitErrors: true,
        failOnHint: true
    }
};

const commonPlugins = {
    plugins: [
        PLUGINS.globals,
        PLUGINS.html,
        PLUGINS.onTest
    ]
};

const devCommon = {
    output: {
        path: PATHS.build,
        publicPath: 'http://' + DEV_SERVER.host + ':' + DEV_SERVER.port + '/',
        filename: 'assets/js/bundle.js',
        pathinfo: true
    },

    devtool: 'source-map',
    debug: true,

    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css?sourceMap'
        }, {
            test: /\.scss$/,
            include: [PATHS.app],
            loader: 'style!css?sourceMap!sass?sourceMap'
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url?limit=10000&name=assets/img/[name].[ext]'
        }, {
            test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)$/,
            loader: 'url?limit=10000&name=assets/fonts/[name].[ext]'
        }]
    }
};


// Default configuration
if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, commonPlugins, devCommon, {
        devServer: {
            contentBase: 'build/',
            stats: {
                colors: true
            },
            proxy: {
                '/ws*': {
                    target: 'http://localhost:8080/',
                    secure: false
                },
                '/auth*': {
                    target: 'http://localhost:8080/',
                    secure: false
                }
            },
            host: DEV_SERVER.host,
            port: DEV_SERVER.port
        }
    });
}

if (TARGET === 'devBuild') {
    module.exports = merge(common, commonPlugins, devCommon, {
        plugins: [
            PLUGINS.clean
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, commonPlugins, {
        output: {
            filename: 'assets/js/bundle-[hash].js'
        },

        bail: true,

        plugins: [
            PLUGINS.clean,
            PLUGINS.extractCss,
            PLUGINS.deduplication,
            PLUGINS.uglify
        ],

        module: {
            loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap', {
                    publicPath: '../../'
                })
            }, {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap', {
                    publicPath: '../../'
                })
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=10000&name=assets/img/[name]-[hash].[ext]'
            }, {
                test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)$/,
                loader: 'url?limit=10000&name=assets/fonts/[name]-[hash].[ext]'
            }]
        }
    });
}

if (TARGET === 'test') {
    var base = {
        testContext: common.context,
        testEntry: common.entry.app,
        resolve: common.resolve,
        module: common.module
    };

    base.module.loaders = base.module.loaders.concat(devCommon.module.loaders);

    module.exports = merge(base, {
        plugins: [
            PLUGINS.globals,
            PLUGINS.onTest
        ]
    });
}