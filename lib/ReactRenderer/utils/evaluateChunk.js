import promisify from 'es6-promisify';
import evaluate from 'eval';
import exportModule from './exportModule';

function evaluateChunk(compiler, chunk) {
  const stat = compiler.getStats().toJson();
  const path = compiler.options.output.publicPath || '';

  const assetByChunkName = Object
    .keys(stat.assetsByChunkName)
    .reduce((assets, name) => Object.assign(assets, {
      [name]: [].concat(stat.assetsByChunkName[name])[0],
    }), {});

  const assets = Object
    .keys(assetByChunkName)
    .reduce((chunks, name) => Object.assign(chunks, {
      [name]: `${path}/${assetByChunkName[name]}`,
    }), {});

  const requireAsset = (chunkName, scope) => {
    const asset = assetByChunkName[chunkName];
    const source = compiler.assets[asset].source();
    const module = evaluate(`module.exports = ${source}`, chunk, scope, false);

    return exportModule(module);
  };

  let scope = {};

  if (process.env.NODE_ENV === 'production') {
     // This is built for development with inline mode enabled only
    delete assets[chunk];
  } else {
    // Workaround to bypass webpack-dev-server inline script at
    // https://github.com/webpack/webpack-dev-server/blob/master/client/index.js#L10-L13
    // when evaluating bundle with inline mode enabled
    scope = {
      window: { attachEvent() {} },
      document: {
        getElementsByTagName() {
          return [{ getAttribute() { return ''; } }];
        },
      },
      setTimeout() {},
      console,
    };
  }

  // Build function suport both Promise / Callback pattern
  const build = promisify(
    requireAsset(chunk, scope)
  );

  // Execuate build chunk to start rendering pages
  return build({
    assets,
    requireAsset,
  });
}

export default evaluateChunk;
