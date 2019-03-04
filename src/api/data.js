import request from '@/utils/request'

export function APIWeightDiff(param) {
  const data = { condition: param }
  return request({
    url:
      '/data-center/weight-diff?page=' +
      param.page +
      '&pageSize=' +
      param.pageSize +
      '&sort=' +
      param.sort,
    method: 'post',
    data
  })
}
export function APIUpdateWeight(param) {
  const data = { condition: param }
  return request({
    url: '/data-center/update-weight',
    method: 'post',
    data
  })
}
export function APIDelay(param) {
  const data = { condition: param }
  return request({
    url: '/data-center/delay-delivery',
    method: 'post',
    data
  })
}
