import path from 'path';
import webpack from 'webpack';
import build from './app/build';
// import Feed from './lib/Feed';
import ReactRenderer from './lib/ReactRenderer';

const config = {
  entry: {
    app: path.join(__dirname, 'app/index.js'),
    // data: path.join(__dirname, 'module/data.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
  devServer: {
    hot: true,
    contentBase: 'dist/',
    historyApiFallback: true,
    compress: false,
    quiet: false,
    noInfo: false,
    lazy: true,
    // filename: "bundle.js",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    publicPath: '/',
    headers: {},
    stats: { colors: true },
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
  // devtool: "source-map",
  plugins: [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react-dom'),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     CONTENT_PATH: `"../${process.env.CONTENT_PATH || 'contents'}"`
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin("c", "c.js")
    // new Feed("contents", {}),
    new ReactRenderer(build),
  ],
};

export default config;
