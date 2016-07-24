// Locate all files under content folder
const contentContext = require.context(process.env.CONTENT_PATH, true);

// Require all files
contentContext.keys().forEach(contentContext);
