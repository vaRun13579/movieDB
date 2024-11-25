function caseConvertion(word) {
  let r = ''
  let flag = 0
  word.split('').forEach(letter => {
    if (flag) {
      r += letter.toUpperCase()
      flag = 0
    } else if (letter === '_') {
      flag = 1
    } else {
      r += letter
    }
  })
  return r
}

function formateObj(obj) {
  const result = {}
  Object.keys(obj).forEach(item => {
    result[caseConvertion(item)] = obj[item]
  })
  return result
}

export default formateObj
