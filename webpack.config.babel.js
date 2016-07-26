import path from 'path';
import webpack from 'webpack';
import build from './app/build';
import ReactRenderer from './lib/ReactRenderer';

const config = {
  entry: {
    'assets/app': path.join(__dirname, 'app/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  plugins: [
    new ReactRenderer(build),
  ],
};

export default config;
