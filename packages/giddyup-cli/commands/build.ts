import ora from "ora"
import { spawn } from "child_process"

export default () => {
  const compiling = ora("Compiling").start()
  spawn("tsc", ["--project", "tsconfig.json"], {
    stdio: "inherit",
  }).on("close", (code) => {
    if (code === 0) {
      compiling.succeed()
    } else if (code === 1) {
      compiling.warn()
    } else {
      compiling.fail()
    }
  })
}
