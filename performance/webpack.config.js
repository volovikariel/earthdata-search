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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
