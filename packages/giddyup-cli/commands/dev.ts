import chokidar from "chokidar"
import debounce from "debounce"
import spawn from "cross-spawn"

async function startServer() {
  return spawnAsync(
    `${__dirname}/../../node_modules/.bin/http-server`,
    ["./dist"],
    {
      stdio: "inherit",
    }
  ).catch((err) => {
    console.error(err)
  })
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
