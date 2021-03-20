console.log("dirname", __dirname + "/../../site")

module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: `${__dirname}/../../site`,
      data: "data",
      includes: "includes",
      output: `${__dirname}/../../dist`,
    },
    templateFormats: ["html", "hbs", "md"],
  }
}
