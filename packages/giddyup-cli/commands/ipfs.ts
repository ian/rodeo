import { spawn } from "child_process"

export default async () => {
  await spawnAsync("yarn", ["build"], {
    stdio: "inherit",
  }).catch((err) => {
    console.error(err)
  })

  await spawnAsync(`${__dirname}/../../node_modules/.bin/ipd`, [`dist`], {
    stdio: "inherit",
  }).catch((err) => {
    console.error(err)
  })
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
