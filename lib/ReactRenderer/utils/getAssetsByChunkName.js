import evaluate from 'eval';
import exportModule from './exportModule';

function getAssetsByChunkName(compiler) {
  const stat = compiler.getStats().toJson();
  const path = compiler.options.output.publicPath || '';

  return Object
    .keys(stat.assetsByChunkName)
    .reduce((assets, chunk) => {
      const window = {};
      const asset = [].concat(stat.assetsByChunkName[chunk])[0];

      return Object.assign({}, assets, {
        [chunk]: {
          path: `${path}/assets/${asset}`,
          require() {
            const source = compiler.assets[asset].soruce();
            const module = evaluate(source, chunk, { window }, false);

            return exportModule(module);
          },
        },
      });
    }, {});
}

export default getAssetsByChunkName;
