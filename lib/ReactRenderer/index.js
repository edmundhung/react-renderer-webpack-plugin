import webpack from 'webpack';
import MultiEntryPlugin from 'webpack/lib/MultiEntryPlugin';
import render from './utils/render';
import getDevServerEntries from './utils/getDevServerEntries';

class ReactRenderer {
  constructor(options = {}) {
    const {
      name = 'react-renderer',
      path = './build.js',
    } = options;

    this.name = name;
    this.path = path;
  }

  apply(compiler) {
    let additionalEntries = [];

    if (process.env.NODE_ENV !== 'production') {
      additionalEntries = getDevServerEntries(compiler.options);
    }

    compiler.apply(
      new MultiEntryPlugin(this.context, additionalEntries.concat(this.path), this.name)
    );

    // Prefetch react & react-dom
    compiler.apply(
      new webpack.PrefetchPlugin('react'),
      new webpack.PrefetchPlugin('react-dom')
    );

    compiler.plugin('emit', render.bind(this));
  }
}

export default ReactRenderer;
