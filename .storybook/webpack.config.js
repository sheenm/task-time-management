const path = require('path');

module.exports = ({ config }) => {
  // allowing absolute imports in storybook
  config.resolve.modules.push(path.resolve(__dirname, "../src"));
  return config;
};
