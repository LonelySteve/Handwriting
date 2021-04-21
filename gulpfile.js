const del = require("del")

async function clean() {
  await del("dist/**")
}

module.exports = { clean }
