

export function  stringQuery (query) {
    return Object.keys(query).map((item) => {
        return `${item}=${query[item]}`
    }).join('&')
}

/**
 * 数字格式转换成千分位
 *@param{Object}num
 */
export function commafy (num) {
  if ((num + '').trim() === '') {
    return ''
  }
  if (isNaN(num)) {
    return ''
  }
  num = num + ''
  if (/^.*\..*$/.test(num)) {
    let pointIndex = num.lastIndexOf('.')
    let intPart = num.substring(0, pointIndex)
    let pointPart = num.substring(pointIndex + 1, num.length)
    intPart = intPart + ''
    let re = /(-?\d+)(\d{3})/
    while (re.test(intPart)) {
      intPart = intPart.replace(re, '$1,$2')
    }
    num = intPart + '.' + pointPart
  } else {
    num = num + ''
    let re = /(-?\d+)(\d{3})/
    while (re.test(num)) {
      num = num.replace(re, '$1,$2')
    }
  }
  return num
}
