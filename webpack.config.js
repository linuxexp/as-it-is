/**
 * Created by raja on 07/05/17.
 */
const path = require("path");
const WebpackShellPlugin = require('webpack-shell-plugin');
//const webpack = require("webpack");
module.exports = {
    entry: [path.join(__dirname, 'app/libraries.js'), path.join(__dirname, 'app/app.js')],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'bundle.js'
    },
    target: 'web',
    plugins: [
        new WebpackShellPlugin({
            onBuildExit:['cp app/index.html dist/index.html']
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'ngtemplate-loader?relativeTo=' + (path.join(path.resolve(__dirname), "app")) + '/!raw-loader'
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname), path.resolve('./app/'), path.join(path.resolve(__dirname), "node_modules")]
    }
};
