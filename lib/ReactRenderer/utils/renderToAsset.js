import ReactDOM from 'react-dom/server';

function renderToAsset(page, isStatic = false) {
  const render = ReactDOM[isStatic ? 'renderToStaticMarkup' : 'renderToString'];
  const contents = `<!DOCTYPE html>${render(page)}`;

  return {
    source() {
      return contents;
    },
    size() {
      return contents.length;
    },
  };
}

export default renderToAsset;
