import promisify from 'es6-promisify';
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
    compiler.plugin('emit', (compiler, done) => { // eslint-disable-line no-shadow
      const assets = getAssetsByChunkName(compiler);

      this
        .render(assets)
        .then(pages => {
          compiler.assets = Object  // eslint-disable-line no-param-reassign
            .keys(compiler.assets)
            .reduce((build, asset) => Object.assign(build, {
              [`assets/${asset}`]: compiler.assets[asset],
            }), pages);
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
