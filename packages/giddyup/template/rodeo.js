module.exports = function () {
  return {
    dir: {
      input: "site",
      data: "data",
      includes: "includes",
      output: "dist",
    },
    templateFormats: ["html", "hbs", "md"],
  }
}
