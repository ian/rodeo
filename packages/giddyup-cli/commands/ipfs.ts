const { parse, stringify } = require("envfile")

import inquirer from "inquirer"
import fs from "fs-extra"
import { spawn } from "child_process"

export default async () => {
  let env = {
    PINATA_API_KEY: null,
    PINATA_SECRET_KEY: null,
  }
  const cwd = process.cwd()

  try {
    await fs.stat(".env")
    env = parse(await fs.readFileSync(".env", "utf8"))
  } catch (err) {
    // if the file doesn't exist, will be created.
    console.error("ERROR", err)
  }

  if (!env.PINATA_API_KEY || !env.PINATA_SECRET_KEY) {
    await inquirer
      .prompt([
        {
          type: "input",
          name: "apiKey",
          message: "What's your Pinata API key?",
        },
        {
          type: "input",
          name: "secretKey",
          message: "What's your Pinata SECRET key?",
        },
      ])
      .then(async (answers) => {
        const { apiKey, secretKey } = answers

        env = {
          ...env,
          PINATA_API_KEY: apiKey,
          PINATA_SECRET_KEY: secretKey,
        }
        await fs.writeFileSync(".env", stringify(env))
      })
  }

  await spawnAsync("yarn", ["build"], {
    stdio: "inherit",
  }).catch((err) => {
    console.error(err)
  })

  await spawnAsync(
    `${__dirname}/../../node_modules/.bin/ipd`,
    [`./dist`, "-p", "pinata"],
    {
      env: {
        ...process.env,
        IPFS_DEPLOY_PINATA__API_KEY: env.PINATA_API_KEY,
        IPFS_DEPLOY_PINATA__SECRET_API_KEY: env.PINATA_SECRET_KEY,
      },
      stdio: "inherit",
    }
  ).catch((err) => {
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
