const fs = require('fs')
const path = require('path')
const random = require('./random')
const { shallowEquals } = require('./utils')
let jsonArray = []

const numberOfInstitutions = require('../institution').length
const numberOfKekvs = require('../kekv').length

const rnd = {
  year: () => random.getRandomInt(1991, 2016),
  limit: () => random.getRandom(1000, 10000).toFixed(2),
  institution: () => random.getRandomInt(0, numberOfInstitutions),
  kekv: () => random.getRandomInt(0, numberOfKekvs),
  generate () {
    return {
      year: this.year(),
      limit: this.limit(),
      institution: this.institution(),
      kekv: this.kekv()
    }
  },
  generateWithoutLimit () {
    return {
      year: this.year(),
      institution: this.institution(),
      kekv: this.kekv()
    }
  }
}

// First push
for (let i = 0; i < numberOfInstitutions; i++) {
  jsonArray.push({
    year: rnd.year(),
    institution: i,
    kekv: rnd.kekv(),
    limit: rnd.limit()
  })
}

function shallowIncludesEstimate (arr, obj) {
  return arr.find((item) => shallowEquals({
    year: item.year,
    institution: item.institution,
    kekv: item.kekv
  }, {
    year: obj.year,
    institution: obj.institution,
    kekv: obj.kekv
  })) != null
}

while (jsonArray.length !== 3000) {
  const obj = rnd.generate()
  if (!shallowIncludesEstimate(jsonArray, obj)) {
    jsonArray.push(obj)
  }
}

fs.writeFileSync(path.resolve(__dirname, '../estimate.json'), JSON.stringify(jsonArray, null, 2))
