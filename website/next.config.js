const path = require("path");
const withImages = require("next-images");

module.exports = withImages({
  webpack: (config) => {
    config.resolve.alias["./"] = path.resolve(__dirname);
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
});
