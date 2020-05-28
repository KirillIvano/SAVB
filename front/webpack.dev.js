const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config');
const webpack = require('webpack');

const dev = {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    devServer: {
        historyApiFallback: true,
        hotOnly: true,
        contentBase: path.resolve(__dirname, 'dist'),
        port: '8080',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __SERVER_ORIGIN__: '"http://194.67.109.99:500"',
            __CLIENT_ORIGIN__: '"http://localhost:8080"'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [
                    {
                        loader: 'style-loader',

                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: 'camelCase',
                            exportOnlyLocals: true,
                            include: /flexboxgrid/,
                            // localsConvention: 'camelCase',
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                paths: [path.resolve(__dirname, 'src', 'styles')],
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|ico)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false
                    }
                }
            },
        ],
    },
};

module.exports = merge(common, dev);
