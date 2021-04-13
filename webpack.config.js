/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const RemoveSourceMapUrlWebpackPlugin = require('@rbarilani/remove-source-map-url-webpack-plugin');

const deployToAnotherProject = true;
let fileManagerSettings = {
  onStart: {},
  onEnd: {},
};

module.exports = (env) => {
  const devMode = env.NODE_ENV !== 'production';

  let plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: devMode,
      typescript: {
        diagnosticOptions: { syntactic: true, semantic: true, declaration: false, global: false },
      },
      eslint: {
        files: './src/**/*.{ts,tsx}',
      },
      formatter: !devMode ? typescriptFormatter : undefined,
    }),
  ];
  if (devMode) {
    plugins = [
      ...plugins,
      new HtmlWebpackPlugin({
        inject: false,
        favicon: false,
        template: path.join(__dirname, 'public', 'index.dev.html'),
        filename: 'index.html',
      }),
    ];
  } else {
    if (deployToAnotherProject) {
      const options = {
        force: true,
      };
      fileManagerSettings.onEnd.copy = [{ source: './public/loader.js', destination: './dist/loader.js', options }];
    }
    plugins = [
      ...plugins,
      new HtmlWebpackPlugin({
        inject: false,
        favicon: false,
        template: path.join(__dirname, 'public', 'index.prod.html'),
        filename: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new InlineSourceWebpackPlugin({
        compress: true,
        rootpath: './dist',
        noAssetMatch: 'warn',
      }),
      new RemoveSourceMapUrlWebpackPlugin(),
      new FileManagerPlugin({
        events: fileManagerSettings,
      }),
    ];
  }

  let minimizer = [];
  if (!devMode) {
    minimizer = [
      new TerserPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/,
          filename() {
            return 'LICENSE';
          },
          banner: () => `Build date: ${new Date().toUTCString()}, @license MIT`,
        },
        parallel: true,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ];
  }

  return {
    mode: env.NODE_ENV || 'development',
    devtool: 'inline-source-map',
    stats: 'errors-only',
    target: 'web',
    entry: {
      app: path.join(__dirname, 'src', 'index.tsx'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      },
    },
    output: {
      // filename: devMode ? 'app.js' : bundleJsName,
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '',
    },
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      port: 3000,
      host: '0.0.0.0',
      hot: true,
      noInfo: true,
      stats: 'errors-only',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: false } },
            'postcss-loader',
            { loader: 'sass-loader', options: { sourceMap: false } },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|woff(2)|ttf|eot|svg)$/,
          exclude: /node_modules/,
          use: ['file-loader'],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer,
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/](preact)[\\/]/,
      //       name: 'vendor',
      //       chunks: 'all',
      //     },
      //   },
      // },
    },
    plugins,
  };
};
