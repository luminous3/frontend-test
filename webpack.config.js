const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      modules: path.resolve(__dirname, 'src/modules/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      decorators: path.resolve(__dirname, 'src/decorators/'),
    },
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: [
      {
        path: '/v3/businesses/**',
        target: 'https://api.yelp.com',
        changeOrigin: true
      },
    ]
  }
};

// Styles
config.module.rules.push({
  test: /\.css$/,
  use: ['style-loader', 'css-loader?modules=true']
})


module.exports = config
