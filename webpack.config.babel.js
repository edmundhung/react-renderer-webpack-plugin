import path from 'path';
import ReactRenderer from './lib/ReactRenderer';

const config = {
  devServer: {
    historyApiFallback: true,
    compress: false,
    quiet: false,
    noInfo: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    headers: {},
    stats: { colors: true },
  },
  entry: {
    'assets/app': path.join(__dirname, 'index.js'),
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
    new ReactRenderer(),
  ],
};

export default config;
