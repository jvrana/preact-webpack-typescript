const webpack = require('webpack');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, args) => {
    const isProduction = args && args['mode'] === 'production';
    console.log('');
    console.log(isProduction ? 'PRODUCTION BUILD' : 'DEVELOPMENT BUILD');
    console.log('');

    const config = {
        resolve: {
            alias: {
                "react": "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",     // Must be below test-utils
                "react/jsx-runtime": "preact/jsx-runtime"
            },
        },
        entry: {
            'scripts/main': path.resolve('./src/index.tsx'),
        },
        output: {
            path: path.resolve('./dist')
        },
        target: 'web',
        devtool: 'source-map',
        optimization: {
            splitChunks: {
                // always create vendor.js
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'scripts/vendor',
                        chunks: 'initial',
                        enforce: true,
                    },
                },
            },
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.html', '.txt']
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    // eslint
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                eslintPath: require.resolve('eslint'),
                            },
                            loader: require.resolve('eslint-loader'),
                        }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates 'style' nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader"
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        "style-loader",
                        "css-loader"
                    ]
                }
            ]
        },
        watchOptions: {
            aggregateTimeout: 100,
            ignored: /node_modules/,
            poll: 300
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            static: {
                directory: path.join(__dirname, 'src/static'),
                publicPath: '/'
            },
            compress: false,
            port: 3000,
            historyApiFallback: true,
            hot: true,
            client: {
                logging: 'error'
            }
        },

        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: isProduction ? 'production' : 'development',
                DEBUG: !isProduction
            }),

            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: '**/*',
                        to: path.resolve('./dist/'),
                        context: './src/static'
                    }
                ]
            })
        ],
    };

    if (isProduction) {
        config.optimization.minimize = true;
        config.optimization.minimizer = [
            new TerserPlugin({extractComments: false}),
            new OptimizeCSSAssetsPlugin({}),
        ]
    }

    return config;
}