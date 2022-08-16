const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.MODE == 'production';

const config = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
    }),
  ],
};

module.exports = () => config;
