/**
 * Created by raja on 07/05/17.
 */
const path = require("path");
const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    entry: [path.join(__dirname, 'app/libraries.js'), path.join(__dirname, 'app/app.js')],
    devtool: "eval-source-map",
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'bundle.js'
    },
    target: 'web',
    plugins: [
        new WebpackShellPlugin({
            onBuildExit:['cp app/index.html dist/index.html']
        }),
        new ExtractTextPlugin('style.css')
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
                test: /\.json$/,
                loader: 'json-loader'
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
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })

            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname),
            path.resolve('./app/'),
            path.join(path.resolve(__dirname), "node_modules")
        ]
    }
};

if (process.env.NODE_ENV === "production") {
    config.devtool = "";
    // Add more configuration for production here like
    // Uglify plugin
    // Offline plugin
    // Etc,
}

module.exports = config;
