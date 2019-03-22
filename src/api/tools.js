export function compareUp(data, propertyName) {
  // 升序排序
  if (typeof Number(data[0][propertyName]) !== 'number') {
    // 属性值为非数字
    return function(object1, object2) {
      var value1 = object1[propertyName]
      var value2 = object2[propertyName]
      return value2.localeCompare(value1)
    }
  } else {
    return function(object1, object2) {
      // 属性值为数字
      var value1 = object1[propertyName]
      var value2 = object2[propertyName]
      return value1 - value2
    }
  }
}
export function compareDown(data, propertyName) {
  // 降序排序
  if (typeof Number(data[0][propertyName]) !== 'number') {
    // 属性值为非数字
    return function(object1, object2) {
      var value1 = object1[propertyName]
      var value2 = object2[propertyName]
      return value2.localeCompare(value1)
    }
  } else {
    return function(object1, object2) {
      // 属性值为数字
      var value1 = object1[propertyName]
      var value2 = object2[propertyName]
      return value2 - value1
    }
  }
}

// 获取日期
export function getMonthDate(dateType) {
  function dateFormatter(date) {
    m = date.getMonth() + 1
    if (m < 10) {
      m = '0' + m
    }
    let d = date.getDate()
    if (d < 10) {
      d = '0' + d
    }
    return [date.getFullYear(), m, d].join('-')
  }
  const today = new Date()
  let y = today.getFullYear()
  let m = today.getMonth() + 1
  let d = today.getDate()
  if (dateType === 'thisMonth') {
    if (m < 10) {
      m = '0' + m
    }
    if (d < 10) {
      d = '0' + d
    }
    const start = [y, m, '01'].join('-')
    const end = [y, m, d].join('-')
    return { start: start, end: end }
  }
  if (dateType === 'previousMonth') {
    m = m - 1
    if (m < 10 && m > 0) {
      m = '0' + m
    }
    if (m === 0) {
      m = 12
      y = y - 1
    }
    const start = [y, m, '01'].join('-')
    const endDate = new Date(y, m, 0).getDate()
    const end = [y, m, endDate].join('-')
    return { start: start, end: end }
  }

  if (dateType === 'lastMonth') {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    return { start: dateFormatter(start), end: dateFormatter(end) }
  }
}

// 判断dateType

export function getDateRangeType(minDate, maxDate) {
  const thisMonth = getMonthDate('thisMonth')
  const previousMonth = getMonthDate('previousMonth')
  const lastMonth = getMonthDate('lastMonth')
  if (minDate === thisMonth['start'] && thisMonth['end'] === maxDate) {
    return 0
  }
  if (minDate === previousMonth['start'] && previousMonth['end'] === maxDate) {
    return 2
  }
  if (minDate === lastMonth['start'] && lastMonth['end'] === maxDate) {
    return 1
  }
  return 3
}
