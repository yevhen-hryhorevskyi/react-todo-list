var webpack = require('webpack');
var pck = require('./package');
var buildUtils = require('./buildUtils');
var buildHash = buildUtils.hashCode(new Date());

module.exports = {
    entry: {
        app: ['./src/main.js']
    },
    output: {
        filename: '[name]-' + buildHash + '.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel?' + JSON.stringify({
                // react-optimize ---> https://github.com/thejameskyle/babel-react-optimize
                presets: ["react-optimize", "es2015", "stage-0", "react"],
                plugins: [
                    ["transform-decorators-legacy"],
                    ["transform-runtime", {"polyfill": false, "regenerator": true, "moduleName": "babel-runtime"}]
                ]
            })]
        }]
    }
};