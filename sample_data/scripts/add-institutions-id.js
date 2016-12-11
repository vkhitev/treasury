const institutions = require('../institution.json')
const fs = require('fs')
const path = require('path')

institutions.forEach((item, i) => {
  Object.assign(item, { id: i + 1 })
})

fs.writeFileSync(path.resolve(__dirname, '../institution-with-id.json'), JSON.stringify(institutions, null, 2))
