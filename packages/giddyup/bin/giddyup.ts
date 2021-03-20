#!/usr/bin/env node

import fs from "fs"
import fsUtils from "fs-utils"
import cpFile from "cp-file"
import ora from "ora"

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
      const { projectName } = answers
      const dir = process.cwd()
      const projectDir = `${dir}/${projectName}`

      const initializing = ora("Initializing Project").start()

      // console.log(
      //   "copying",
      //   `${__dirname}/../rodeo.js`,
      //   "to",
      //   `${projectDir}/rodeo.js`
      // )

      await cpFile(
        `${__dirname}/../template/rodeo.js`,
        `${projectDir}/rodeo.js`
      )

      initializing.succeed("DONE")
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
})()
