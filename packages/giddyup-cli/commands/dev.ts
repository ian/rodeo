import chokidar from "chokidar"
import debounce from "debounce"
import spawn from "cross-spawn"
import server from "live-server"

async function startServer() {
  var params = {
    port: 8080, // Set the server port. Defaults to 8080.
    root: "./dist", // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    // file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    // mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 0, // 0 = errors only, 1 = some, 2 = lots
    // middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
  }

  server.start(params)
}

const handleStyleChange = debounce(async (event) => {
  console.clear()
  console.log("Building Rodeo ...")

  const invocations = [
    [
      `${__dirname}/../../node_modules/.bin/postcss`,
      "styles/main.css",
      "-d",
      "dist/css/",
      "--config",
      `${__dirname}/../postcss.config.js`,
    ],
  ]
  for (const [program, ...args] of invocations) {
    const res = await spawnAsync(program, args, {
      stdio: "inherit",
    }).catch((err) => {
      console.error(err)
    })
  }

  console.log()
  console.log("Rodeo running on http://localhost:8080")
})

const handleSiteChange = debounce(async (event) => {
  console.clear()
  console.log("Building Rodeo ...")

  const invocations = [
    [
      `${__dirname}/../../node_modules/.bin/eleventy`,
      "--quiet",
      "--config",
      `rodeo.js`,
    ],
  ]
  for (const [program, ...args] of invocations) {
    const res = await spawnAsync(program, args, {
      stdio: "inherit",
    }).catch((err) => {
      console.error(err)
    })
  }

  console.log()
  console.log("Rodeo running on http://localhost:8080")
}, 300)

export default () => {
  const dir = process.cwd()
  // console.log("Watching", dir)
  startServer()

  chokidar
    .watch(`${dir}/site/**/*`, { persistent: true })
    .on("add", handleSiteChange)
    .on("change", handleSiteChange)

  chokidar
    .watch(`${dir}/data/*.json`, { persistent: true })
    .on("add", handleSiteChange)
    .on("change", handleSiteChange)

  chokidar
    .watch(`${dir}/styles/**/*`, { persistent: true })
    .on("add", handleStyleChange)
    .on("change", handleStyleChange)
}

async function spawnAsync(program, args, options) {
  options = (Array.isArray(args) ? options : args) || {}
  args = Array.isArray(args) ? args : []
  const code = await new Promise((resolve, reject) => {
    const cp = spawn(program, args, options)
    cp.on("error", (ex) => reject(ex))
    cp.on("close", (code) => resolve(code))
  })
  if (code !== 0) {
    throw new Error(
      `${program}${
        args.length ? ` ${JSON.stringify(args)}` : ""
      } exited with non-zero code ${code}.`
    )
  }
}
