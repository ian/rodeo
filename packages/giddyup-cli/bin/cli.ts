#!/usr/bin/env node

import { Command } from "commander"
import pkg from "../package.json"
import BuildCommand from "../commands/build"
import StartCommand from "../commands/start"
import DevCommand from "../commands/dev"

const program = new Command()
program.version(pkg.version)

program.option("-d, --debug", "output extra debugging")

program
  .command("build")
  .description("Builds the app for production")
  .action((source, destination) => {
    BuildCommand()
  })

program
  .command("start")
  .description("Runs the built app in production mode")
  .action((source, destination) => {
    StartCommand()
  })

program
  .command("dev")
  .description("Start the development server")
  .action((source, destination) => {
    DevCommand()
  })

program.parse(process.argv)

const options = program.opts()
if (options.debug) console.log(options)
