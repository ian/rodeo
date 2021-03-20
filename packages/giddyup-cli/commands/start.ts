import { spawn } from "child_process"

export default () => {
  return spawn("node", [`${__dirname}/../lib/prodServer.js`], {
    stdio: "inherit",
  }).on("exit", function (code) {
    // console.log("EXIT", code)
  })
}
