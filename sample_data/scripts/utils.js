function shallowEquals (a, b) {
  return (
    Object.keys(a).every((key) => a[key] === b[key]) &&
    Object.keys(a).length === Object.keys(b).length
  )
}

function shallowIncludes (arr, obj) {
  return arr.find((item) => shallowEquals(item, obj)) != null
}

exports.shallowEquals = shallowEquals
exports.shallowIncludes = shallowIncludes
