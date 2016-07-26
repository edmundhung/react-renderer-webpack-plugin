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
        <script src={assets['assets/app'].path} />
      </body>
    </html>
  );
}

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  children: PropTypes.element,
};

export default build;
export { Html };
