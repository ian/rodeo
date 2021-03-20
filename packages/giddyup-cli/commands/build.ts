import ora from "ora"
import { spawn } from "child_process"

export default () => {
  const compiling = ora("Compiling").start()

  spawn(
    `${__dirname}/../../node_modules/.bin/eleventy`,
    ["--input", "./site"],
    {
      stdio: "inherit",
    }
  ).on("close", (code) => {
    if (code === 0) {
      compiling.succeed()
    } else if (code === 1) {
      compiling.warn()
    } else {
      compiling.fail()
    }
  })
}
