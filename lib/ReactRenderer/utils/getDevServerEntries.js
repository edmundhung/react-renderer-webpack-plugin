function getDevServerEntries(options) {
  const { entry } = options;

  const devEntry = {
    inline: [],
    hot: [],
  };

  let chunks = [];

  if (typeof entry === 'object' && !Array.isArray(entry)) {
    chunks = chunks.concat(Object.keys(entry).map(name => entry[name]));
  } else {
    chunks = chunks.concat(entry);
  }

  chunks
    .filter(chunk => Array.isArray(chunk))
    .reduce((paths, chunk) => paths.concat(chunk), [])
    .forEach(path => {
      if (path.indexOf('webpack-dev-server/client') > -1) {
        devEntry.inline = path;
      } else if (path.indexOf('webpack/hot/') > -1) {
        devEntry.hot = path;
      }
    });

  return [].concat(devEntry.inline, devEntry.hot);
}

export default getDevServerEntries;
