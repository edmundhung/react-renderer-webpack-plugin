import React, { PropTypes } from 'react';

function build(assets) {
  return Promise.resolve({
    'index.html': <Html assets={assets} />,
  });
}

function Html(props) {
  const { assets, children } = props;

  return (
    <html>
      <head>
        <title>EdStudio</title>
      </head>
      <body>
        <div id="app">{children}</div>
        <script src={assets.app.path} />
      </body>
    </html>
  );
}

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  children: PropTypes.element,
};

// import { match, RouterContext } from 'react-router';
// import routes, { getPaths }     from './routes';

// export function loadPage(path) {
//   return new Promise((resolve, reject) => {
//     match({ routes, location }, (error, redirectLocation, renderProps) => {
//       if (error) {
//         reject(`500: ${error.message}`);
//       } else if (redirectLocation) {
//         reject(`302: ${redirectLocation.pathname + redirectLocation.search}`);
//       } else if (!renderProps) {
//         reject(`404: Not found`);
//       } else {
//         resolve({
//           path,
//           page: <RouterContext { ...renderProps } />
//         });
//       }
//     });
//   }));
// }
//
// export default function build(assets) {
//   const paths = getBuildPaths();
//
//   return Promise
//     .all(paths.map(loadPage))
//     .then(results => {
//       return results.reduce((site, { path, page }) => {
//         ...site,
//         [path]: <Html assets={ assets }>{ page }</Html>
//       }, {})
//     });
// }

export default build;
export { Html };
