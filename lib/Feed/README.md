ReStatic
==========================================
A blog-aware ReactJS static site generator


Installation
------------------------------------------

```
$ npm install restatic
```

Usage
------------------------------------------

#### CLI

```
$ restatic init
$ restatic serve
$ restatic build
```

#### Node

```javascript
var restatic = require('restatic');

// Build the html files
restatic.build(configs, callback);
```

Configuring `restatic.config.js`
------------------------------------------

```javascript
module.exports = {
  // configuration
};
```
