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
    const prefetchPlugins = ['react', 'react-dom']
      .concat(additionalEntries)
      .map(entry => new webpack.PrefetchPlugin(entry));

    compiler.apply.apply(compiler, prefetchPlugins);

    // Assets build, start rendering pages
    compiler.plugin('emit', render.bind(this));
  }
}

export default ReactRenderer;
