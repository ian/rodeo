module.exports = function (config) {
  config.addPassthroughCopy({ "site/img/*": "img" });
  
  return {
    ...config,
    dir: {
      input: "site",
      data: "data",
      includes: "includes",
      output: "dist",
    },
    templateFormats: ["html", "hbs", "md"],
  }
}