const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');

module.exports = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js', '.html', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            vue: 'vue/dist/vue.js',
        },
    },
    output: {
        path: path.resolve(__dirname, '..', '..', 'savb_testing', 'client'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanObsoleteChunks(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: false,
            favicon: './src/favicon.ico',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    } ,
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
