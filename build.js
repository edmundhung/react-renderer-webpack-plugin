import React, { PropTypes } from 'react';

function build(options, callback) {
  const { assets } = options;

  callback(null, {
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
        {Object.keys(assets).map(asset => (
          <script src={assets[asset]} />
        ))}
      </body>
    </html>
  );
}

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  children: PropTypes.element,
};

export default build;
