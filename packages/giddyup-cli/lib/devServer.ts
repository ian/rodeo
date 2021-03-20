#!/usr/bin/env node
let server

process.on("SIGINT", () => {
  server.stop()
})

async function run() {
  const dir = process.cwd()
  console.log("RUNNING")
}

run()
