const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJsPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const developmentMode = process.env.NODE_ENV !== 'production'

const extractHtml = new HtmlWebPackPlugin({
  template: './static/src/index.html',
  filename: './index.html'
})

const StaticWebpackConfig = {
  name: 'static',
  entry: {
    fontAwesome: 'font-awesome/scss/font-awesome.scss',
    client: './static/src/index.js'
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'static/dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  optimization: {
    minimizer: [
      new TerserJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        include: /\.js$/
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          { loader: 'eslint-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // eslint-disable-next-line
              resources: require(path.join(process.cwd(), "/static/src/css/utils/utils.js")),
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[path][name].[hash].[ext]'
          }
        }
      },
      {
        test: /font-awesome\.config\.js/,
        use: [
          { loader: 'style-loader' },
          { loader: 'font-awesome-loader' }
        ]
      }
    ]
  },
  plugins: [
    extractHtml,
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin([path.resolve(__dirname, 'static/dist')]),
    new MiniCssExtractPlugin({
      filename: developmentMode ? '[name].min.css' : '[name].[contenthash].min.css',
      chunkFilename: developmentMode ? '[id].min.css' : '[id].[contenthash].min.css',
      publicPath: '/'
    }),
    new CopyWebpackPlugin([
      { from: './static/src/assets/public', to: './' }
    ])
    // new BundleAnalyzerPlugin()
  ]
}

if (!developmentMode) {
  StaticWebpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        chunks: 'all',
        name: 'vendor',
        test: /[\\/]node_modules[\\/]/,
        maxSize: 500000
      },
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      }
    }
  }
  StaticWebpackConfig.optimization.runtimeChunk = true
}

module.exports = StaticWebpackConfig
