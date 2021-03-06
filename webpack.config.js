const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const RemoveSourceMapUrlWebpackPlugin = require('@rbarilani/remove-source-map-url-webpack-plugin');
const sassGlobImporter = require('node-sass-glob-importer');
const Dotenv = require('dotenv-webpack');
const UglifyJS = require('uglify-js');
const chalk = require('chalk');

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');
const deployToAnotherProject = true;
let fileManagerSettings = {
  onStart: {},
  onEnd: {},
};

const PostBuild = ({ files, options }) => ({
  apply: (compiler) => {
    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
      try {
        files.forEach((f) => {
          fs.writeFileSync(f, UglifyJS.minify(readFile(f), options).code, { encoding: 'utf8', flag: 'w' });
        });
        process.stdout.write('\x1B[2J\x1B[3J\x1B[H' + chalk.cyan('\nBuild complete\n'));
      } catch (error) {
        process.stdout.write(chalk.red(error));
      }
    });
  },
});

const DevHooks = () => ({
  apply: (compiler) => {
    const hooks = ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler);
    hooks.waiting.tap('start', () => {
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H' + chalk.cyan('\nDev mode started\n'));
    });
  },
});

module.exports = (env) => {
  const devMode = !env.production;

  let plugins = [
    new MiniCssExtractPlugin({ filename: 'app.css' }),
    new ForkTsCheckerWebpackPlugin({
      async: devMode,
      typescript: {
        diagnosticOptions: { syntactic: true, semantic: true, declaration: false, global: false },
      },
      eslint: {
        files: './src/**/*.{ts,tsx}',
      },
      formatter: !devMode ? typescriptFormatter : undefined,
      logger: { infrastructure: 'silent', issues: 'console', devServer: true },
    }),
  ];
  if (devMode) {
    plugins = [
      ...plugins,
      new Dotenv({ path: './.env.dev' }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        favicon: false,
        template: path.join(__dirname, 'public', 'index.dev.html'),
        filename: 'index.html',
      }),
      DevHooks(),
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
      new Dotenv({ path: './.env' }),
      new FileManagerPlugin({
        events: fileManagerSettings,
      }),
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
      PostBuild({ files: ['./dist/loader.js'] }),
    ];
  }

  let minimizer = [];
  if (!devMode) {
    minimizer = [
      new CssMinimizerPlugin(),
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
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: devMode } },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: devMode,
                sassOptions: {
                  importer: sassGlobImporter(),
                },
              },
            },
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
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](preact|preact-custom-element|react-hook-form)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    plugins,
  };
};
