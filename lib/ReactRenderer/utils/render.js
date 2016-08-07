import renderToAsset from './renderToAsset';
import evaluateChunk from './evaluateChunk';

function render(compiler, done) {
  evaluateChunk(compiler, this.name)
    .then(htmlByPath => Object
      .keys(htmlByPath)
      .reduce((pages, path) => Object.assign(pages, {
        [path]: renderToAsset(htmlByPath[path]),
      }), {})
    )
    .then(pages => {
      // eslint-disable-next-line no-param-reassign
      compiler.assets = Object.assign({},
        compiler.assets,
        pages
      );

      if (process.env.NODE_ENV === 'production') {
        // eslint-disable-next-line no-param-reassign
        delete compiler.assets[`${this.name}.js`];
      }
    })
    .catch(e => {
      compiler.errors.push(e.stack);
    })
    .then(() => {
      done();
    });
}

export default render;
