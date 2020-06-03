const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'colors.less': '/src/styles/colors.less'
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new CleanObsoleteChunks(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: false,
            // favicon: './src/favicon.ico',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: true,
                },
            },
        ],
    },

};
