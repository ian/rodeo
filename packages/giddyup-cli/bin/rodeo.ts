#!/usr/bin/env node

import { Command } from "commander"
import pkg from "../package.json"
import BuildCommand from "../commands/build"
import DevCommand from "../commands/dev"
import IPFSCommand from "../commands/ipfs"
import TokenCommand from "../commands/tokens"

// "clean": "rm -rf _site",

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
  .command("dev")
  .description("Start the development server")
  .action((source, destination) => {
    DevCommand()
  })

program
  .command("tokens")
  .description("Update tokens for wallet address using Opensea API")
  .action((source, destination) => {
    TokenCommand()
  })

program
  .command("ipfs")
  .description("Deploy your site to IPFS using Pinata")
  .action((source, destination) => {
    IPFSCommand()
  })

program.parse(process.argv)

const options = program.opts()
if (options.debug) console.log(options)
