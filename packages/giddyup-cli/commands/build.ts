import ora from "ora"
import { spawn } from "child_process"

export default async () => {
  console.log("Building ...")

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
    await spawnAsync(program, args, {
      stdio: "inherit",
    }).catch((err) => {
      console.error(err)
    })
  }

  console.log("DONE")
  console.log()
}

// @todo - dry this up
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
