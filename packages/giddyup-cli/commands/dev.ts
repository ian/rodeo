import chokidar from "chokidar"
import debounce from "debounce"
import ora from "ora"
import { spawn } from "child_process"

let server

const handleDirChange = debounce(() => {
  console.clear()
  const compiling = ora("Compiling").start()

  if (server) {
    server.kill("SIGINT")
  }

  // spawn("tsc", ["--project", "tsconfig.json"], {
  //   stdio: ["inherit", "inherit", "inherit"],
  // }).on("close", async (code) => {
  //   if (code === 0) {
  compiling.succeed()

  server = spawn("node", [`${__dirname}/../dist/lib/devServer.js`], {
    stdio: "inherit",
  })
  //   } else {
  //     compiling.fail("Error: Compilation failed. Watching for changes")
  //   }
  // })
}, 300)

export default () => {
  chokidar.watch("./*", { persistent: true }).on("all", handleDirChange)
}
