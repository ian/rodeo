#!/usr/bin/env node

import fs from "fs-extra"
import slugify from "slugify"
import fsUtils from "fs-utils"
import ora from "ora"
import spawn from "cross-spawn"

import inquirer from "inquirer"
;(async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "What's the name of your project",
      },
    ])
    .then(async (answers) => {
      const dir = process.cwd()
      const projectName = slugify(answers.projectName, {
        remove: /[!@#$%^&*()_+|}{:"?><\[\];',./}]/g,
      })
      const projectDir = `${dir}/${projectName}`

      const initializing = ora(`Initializing Project ${projectName}`).start()

      await fs
        .copy(`${__dirname}/../template/rodeo.js`, `${projectDir}/rodeo.js`)
        .catch(console.log)

      await fs
        .copy(`${__dirname}/../template/styles`, `${projectDir}/styles`)
        .catch(console.log)

      await fs
        .copy(`${__dirname}/../template/site`, `${projectDir}/site`)
        .catch(console.log)

      await fsUtils.writeFileSync(
        `${projectDir}/package.json`,
        `
{
  "name": "${projectName}",
  "version": "0.0.1",
  "description": "",
  "scripts": {
    "build": "rodeo build",
    "dev": "rodeo dev"
  },
  "keywords": [],
  "author": "",
  "license": "",
  "devDependencies": {
    "@giddyup/cli": "^0.0.5"
  }
}`
      )

      initializing.succeed("DONE")

      process.chdir(`./${projectName}`)

      await spawnAsync(`yarn`, ["install"], {
        stdio: "inherit",
      }).catch((err) => {
        console.error(err)
      })
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
})()

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
