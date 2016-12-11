const fs = require('fs')
const path = require('path')
const EOL = require('os').EOL

const text = fs.readFileSync(path.resolve(__dirname, '../raw/institutions.txt')).toString()

function captialize (text) {
  return text.replace(/[\wа-яїЇіІА-Я']+/gu, word =>
    word[0].toUpperCase() + word.slice(1).toLowerCase())
}

function alignCommas (text) {
  return text
    .replace(/ *, */g, ', ')
    .replace(/, *$/, '')
}

function normalize (text) {
  text = alignCommas(text)
  text = text.replace(/ {2,}/, ' ')
  text = text.trim()
  text = captialize(text)
  return text
}

const data = text.split(EOL).filter(row => (!!row && !row.startsWith('Номер')))
let jsonArray = []
for (var i = 0; i < data.length; i += 3) {
  const name = data[i].match(/\d+\.\d+\. *(.+)/)[1]
  const code = data[i + 1].match(/(\d+)/)[1]
  const address = data[i + 2].replace('Адреса: ', '').replace(/Індекс :\d+,/, '')
  jsonArray.push({ code, name: normalize(name), address: normalize(address) })
}

fs.writeFileSync(path.resolve(__dirname, '../institution.json'), JSON.stringify(jsonArray, null, 2))
