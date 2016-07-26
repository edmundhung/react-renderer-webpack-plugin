import promisify from 'es6-promisify';
import webpack from 'webpack';
import getAssetsByChunkName from './utils/getAssetsByChunkName';
import renderToAsset from './utils/renderToAsset';

class ReactRenderer {
  constructor(build) {
    this.build = promisify(build);
  }

  render(assets) {
    return this
      .build(assets)
      .then(site => Object
        .keys(site)
        .reduce((built, path) => Object.assign(built, {
          [path]: renderToAsset(site[path]),
        }), {})
      );
  }

  apply(compiler) {
    // Prefetch react & react-dom
    compiler.apply(
      new webpack.PrefetchPlugin('react'),
      new webpack.PrefetchPlugin('react-dom')
    );

    compiler.plugin('emit', (compiler, done) => { // eslint-disable-line no-shadow
      const assets = getAssetsByChunkName(compiler);

      this
        .render(assets)
        .then(pages => {
          // eslint-disable-next-line no-param-reassign
          compiler.assets = Object.assign(
            compiler.assets,
            pages
          );
        })
        .catch(e => {
          compiler.errors.push(e.stack);
        })
        .then(() => {
          done();
        });
    });
  }
}

export default ReactRenderer;
