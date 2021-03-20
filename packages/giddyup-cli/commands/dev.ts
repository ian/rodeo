import chokidar from "chokidar"
import debounce from "debounce"
import ora from "ora"
import Fastify from "fastify"
// import { spawn } from "child_process"
import spawn from "cross-spawn"

const PORT = 3000

let isServerStarted = false
const fastify = Fastify({})
const dir = process.cwd()
fastify.register(require("fastify-static"), {
  // root: path.join(__dirname, 'public'),
  root: `${dir}/dist`,
  // prefix: '/public/', // optional: default '/'
})

function startServer() {
  if (isServerStarted) {
    console.log(`Rodeo running on http://localhost:${PORT}`)
    return
  }
  fastify.listen(PORT, (err, address) => {
    isServerStarted = true

    if (err) throw err
    console.log(`Rodeo running on http://localhost:${PORT}`)
  })
}

const handleDirChange = debounce(async () => {
  console.clear()
  const compiling = ora("Compiling").start()

  const invocations = [
    [
      `${__dirname}/../../node_modules/.bin/postcss`,
      "styles/main.css",
      "-d",
      "dist/css/",
      "--config",
      `${__dirname}/../postcss.config.js`,
    ],
    [
      `${__dirname}/../../node_modules/.bin/eleventy`,
      "--quiet",
      "--config",
      `rodeo.js`,
    ],
  ]
  for (const [program, ...args] of invocations) {
    const res = await spawnAsync(program, args, {
      // stdio: "inherit",
    }).catch((err) => {
      console.error(err)
    })
  }

  compiling.succeed("Compiled")
  console.log()

  startServer()
}, 300)

export default () => {
  chokidar.watch("./*", { persistent: true }).on("all", handleDirChange)
}

async function spawnAsync(program, args, options) {
  options = (Array.isArray(args) ? options : args) || {}
  args = Array.isArray(args) ? args : []
  const code = await new Promise((resolve, reject) => {
    // console.log("Spawning", program, args.join(" "))
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
