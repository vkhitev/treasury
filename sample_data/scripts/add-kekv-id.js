const kekvs = require('../kekv.json')
const fs = require('fs')
const path = require('path')

kekvs.forEach((item, i) => {
  Object.assign(item, { id: i + 1 })
})

fs.writeFileSync(path.resolve(__dirname, '../kekv-with-id.json'), JSON.stringify(kekvs, null, 2))
