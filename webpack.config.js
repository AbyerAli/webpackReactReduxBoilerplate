const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

require('dotenv').config();

module.exports = {
    entry: "./src/index.js",
    mode: process.env.WEBPACK_MODE,
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
            },
            {
                // look for .css or .scss files
                test: /\.(css|scss)$/,
                exclude: /\.module.(s(a|c)ss)$/,
                // in the `src` directory
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: process.env.WEBPACK_MODE == 'PRODUCTION' ? false : true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".less", ".css", ".wasm"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
        new webpackDashboard(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.(js|jsx)$/,
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log', 'console.info'], // Delete console
                    },
                },
            }),
        ],
    },
    devServer: {
        port: 3000,
        open: true,
    }
}