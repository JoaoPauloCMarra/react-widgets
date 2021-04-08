/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const deployToAnotherProject = false;
let fileManagerSettings = {
  onStart: {},
  onEnd: {},
};

module.exports = (env) => {
  const bundleJsName = `app.${new Date().getTime()}.js`;
  const devMode = env.NODE_ENV !== 'production';

  let plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin(),
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
      const buildTarget = path.resolve(__dirname, '..', 'server', 'src', 'views', 'widgets');
      fileManagerSettings.onEnd.copy = [
        { source: './dist/index.html', destination: buildTarget + '/index.html' },
        { source: './dist/app.css', destination: buildTarget + '/app.css' },
        { source: './dist/app.js' + bundleJsName, destination: buildTarget + '/app.js' },
      ];
    }
    plugins = [
      ...plugins,
      new HtmlWebpackPlugin({
        inject: false,
        favicon: false,
        template: path.join(__dirname, 'public', 'index.prod.html'),
        filename: 'index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
      new InlineSourceWebpackPlugin({
        compress: true,
        rootpath: './dist',
        noAssetMatch: 'warn',
      }),
      new FileManagerPlugin({
        events: fileManagerSettings,
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
    },
    output: {
      filename: devMode ? 'app.js' : bundleJsName,
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
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: false } },
            'postcss-loader',
            { loader: 'sass-loader', options: { sourceMap: false } },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|woff(2)|ttf|eot|svg)$/,
          use: ['file-loader'],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    cache: true,
    plugins,
  };
};
