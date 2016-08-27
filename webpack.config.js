var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    devtool: "inline-source-map",
    entry: [
        "webpack-hot-middleware/client",
        "./client/client.js"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css")
    ],
    module: {
        loaders: [
            // JS
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react", "stage-0", "es2015", "react-hmre"]
                }
            },
            // styles
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            // fonts
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                loader: "file"
            },
            // images
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file"
            },
            // favicon
            {
                test: /\.(ico)$/i,
                loader: "file-loader?name=[name].[ext]"
            },
            // files
            {
                test: /\.(pdf)$/i,
                loader: "file"
            }
        ]
    }
};
