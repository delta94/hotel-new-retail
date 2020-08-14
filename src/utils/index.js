

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
/**
 * 数字相乘, 解决js浮点数据相乘出现精度不准确的问题
 * @param {Number | String} arg1 数据1
 * @param {Number | String} arg2 数据1
 * @return {Number} 相乘后的结果
 */
export function accMul (arg1, arg2) {
  if (!arg1 || !arg2) return
  let m = 0
  let s1 = arg1.toString()
  let s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

/**
 * 数字相除, 解决js浮点数据相除出现精度不准确的问题
 * @param {Number | String} arg1 数据1
 * @param {Number | String} arg2 数据1
 * @return {Number} 相除后的结果
 */
export function accDiv (arg1, arg2) {
  if (!arg1) return
  let t1, t2, t3, r1, r2

  t1 = t2 = t3 = 0

  try { t1 = arg1.toString().split('.')[1].length } catch (e) { }

  try { t2 = arg2.toString().split('.')[1].length } catch (e) { }

  r1 = Number(arg1.toString().replace('.', ''))

  r2 = Number(arg2.toString().replace('.', ''))

  if (r2 === 0) { return 0 }

  let result = String(r1 / r2)

  try { t3 = result.toString().split('.')[1].length } catch (e) { }

  let index = t2 - t1 - t3

  if (index < 0) {
    result = result.replace('.', '')

    while (result.length <= Math.abs(index)) {
      result = '0' + result
    }

    let start = result.substring(0, result.length + index)
    let end = result.substring(result.length + index, result.length)

    result = start + '.' + end

    return Number(result)
  } else if (index > 0) {
    result = result.replace('.', '')

    while (result.length <= Math.abs(index)) {
      result += '0'
    }
    return Number(result)
  } else {
    return Number(result.replace('.', ''))
  }
}

/**
 * 数字相加, 解决js浮点数据相加出现精度不准确的问题
 * @param {Number | String} arg1 数据1
 * @param {Number | String} arg2 数据1
 * @return {Number} 相加后的结果
 */
export function accAdd (arg1, arg2) {
  let r1, r2, m, c

  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }

  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }

  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    let cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

/**
 * 数字相减, 解决js浮点数据相减出现精度不准确的问题
 * @param {Number | String} arg1 数据1
 * @param {Number | String} arg2 数据1
 * @return {Number} 相减后的结果
 */
export function accSub (arg1, arg2) {
  let r1, r2, m, n
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n))
}
