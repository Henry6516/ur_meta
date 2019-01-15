import request from '@/utils/request'

// section 部门 http://192.168.0.134:8089/v1/condition/index
export function getSection() {
  return request({
    url: '/condition/department',
    method: 'get'
  })
}

export function getSecDepartment() {
  return request({
    url: '/condition/sec-department',
    method: 'get'
  })
}

// platform 平台 http://192.168.0.134:8089/v1/condition/plat
export function getPlatform() {
  return request({
    url: '/condition/plat',
    method: 'get'
  })
}
// member 销售员 http://192.168.0.134:8089/v1/condition/member
export function getMember() {
  return request({
    url: '/condition/member',
    method: 'get'
  })
}

// store 仓库 http://192.168.0.134:8089/v1/condition/store

export function getStore() {
  return request({
    url: '/condition/store',
    method: 'get'
  })
}

// account 账号 http://192.168.0.134:8089/v1/condition/account

export function getAccount() {
  return request({
    url: '/condition/account',
    method: 'get'
  })
}

export function getExchange() {
  return request({
    url: '/settings/exchange',
    method: 'get'
  })
}
export function getExpress() {
  return request({
    url: '/tiny-tool/express',
    method: 'get'
  })
}
export function getStock(filters) {
  return request({
    url: '/data-center/out-of-stock-info?page=' + filters.page + '&pageSize=' + filters.pageSize,
    method: 'get'
  })
}
export function getBrandcountry() {
  return request({
    url: '/condition/brand-country',
    method: 'get'
  })
}
export function getBrandcategory() {
  return request({
    url: '/condition/brand-category',
    method: 'get'
  })
}
export function getGoodsstatus() {
  return request({
    url: '/condition/goods-status',
    method: 'get'
  })
}
export function getGoodscats() {
  return request({
    url: '/condition/goods-cats',
    method: 'get'
  })
}
export function getPerformlogistics() {
  return request({
    url: '/perform/logistics',
    method: 'get'
  })
}
// name:sales method:post url:http://192.168.0.134:8089/v1/report/sales

export function getSales(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/sales',
    method: 'post',
    data
  })
}

export function getDevelop(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/develop',
    method: 'post',
    data
  })
}

export function getPurchase(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/purchase',
    method: 'post',
    data
  })
}

export function getPossess(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/possess',
    method: 'post',
    data
  })
}
export function getEbaysales(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/ebay-sales',
    method: 'post',
    data
  })
}
export function getSalestrend(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/sales-trend',
    method: 'post',
    data
  })
}
export function getArtist(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/artist',
    method: 'post',
    data
  })
}
export function getaccount(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/account',
    method: 'post',
    data
  })
}

export function getSalesdeadfee(param) {
  const data = { 'condition': param }
  return request({
    url: '/upload/sales-dead-fee',
    method: 'post',
    data
  })
}
export function getUpdateexchange(param) {
  const data = { 'condition': param }
  return request({
    url: '/settings/exchange',
    method: 'post',
    data
  })
}
export function getToolaccount(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/account',
    method: 'post',
    data
  })
}
export function getToolsite() {
  return request({
    url: '/tool/site',
    method: 'post'
  })
}
export function getToolsize() {
  return request({
    url: '/tool/size',
    method: 'post'
  })
}
export function getToolcolor() {
  return request({
    url: '/tool/color',
    method: 'post'
  })
}
export function geteBaytemplate(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/ebay-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

export function geteBaysku(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/ebaysku',
    method: 'post',
    data
  })
}

export function geteBayskutemplate(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/ebaysku-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function getsmtsku(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/smtsku',
    method: 'post',
    data
  })
}
export function getsmtskutemplate(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/smtsku-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function getwishsku(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/wishsku',
    method: 'post',
    data
  })
}
export function getwishskutemplate(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/wishsku-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function getIntroduce(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/introduce',
    method: 'post',
    data
  })
}
export function getBrand(param) {
  const data = { 'condition': param }
  return request({
    url: '/tiny-tool/brand',
    method: 'post',
    data
  })
}
export function getGoodspicture(param) {
  const data = { 'condition': param }
  return request({
    url: '/tiny-tool/goods-picture',
    method: 'post',
    data
  })
}
export function getPerform(param) {
  const data = { 'condition': param }
  return request({
    url: '/perform/perform',
    method: 'post',
    data
  })
}
export function getPsales(param) {
  const data = { 'condition': param }
  return request({
    url: '/perform/sales',
    method: 'post',
    data
  })
}
export function getSalesChange(param) {
  const data = { 'condition': param }
  return request({
    url: '/data-center/sales-change?page=' + param.page + '&sort=' + param.sort,
    method: 'post',
    data
  })
}
export function getPerformcost(param) {
  const data = { 'condition': param }
  return request({
    url: '/perform/cost',
    method: 'post',
    data
  })
}
// 定价器
export function getUkfic(param) {
  const data = { 'condition': param }
  return request({
    url: '/tiny-tool/uk-fic',
    method: 'post',
    data
  })
}
export function getUK(param) {
  const data = { 'condition': param }
  return request({
    url: '/tiny-tool/uk',
    method: 'post',
    data
  })
}
export function getAU(param) {
  const data = { 'condition': param }
  return request({
    url: '/tiny-tool/au',
    method: 'post',
    data
  })
}
export function getOrder(param) {
  const data = { 'condition': param }
  return request({
    url: '/tiny-tool/declared-value',
    method: 'post',
    data
  })
}
export function getPaypal(param) {
  const data = { 'condition': param }
  return request({
    url: '/tiny-tool/exception-pay-pal',
    method: 'post',
    data
  })
}
export function getEdition(param) {
  const data = { 'condition': param }
  return request({
    url: '/tiny-tool/exception-edition',
    method: 'post',
    data
  })
}
export function getRefund(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/refund',
    method: 'post',
    data
  })
}
export function getDeadFee(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/dead-fee?page=' + param.page,
    method: 'post',
    data
  })
}
export function getExtraFee(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/extra-fee?page=' + param.page,
    method: 'post',
    data
  })
}

