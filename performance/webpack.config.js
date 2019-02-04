const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './static/src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'static/dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
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
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?sourceMap' },
          { loader: 'sass-loader?sourceMap' },
          { loader: 'postcss-loader', options: { sourceMap: true } }
        ]
<<<<<<< HEAD
=======
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
>>>>>>> b1d8ae043bb7ba8ae7cd3ac7dbd037a7e00ae97a
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './static/src/index.html',
      filename: './index.html'
    })
  ]
}
