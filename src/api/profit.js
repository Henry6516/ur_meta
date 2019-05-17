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
//全部开发
export function getDeveloper() {
  return request({
    url: '/oa-goods/developer',
    method: 'get'
  })
}
// 没有权限的人员
export function getUsers() {
  return request({
    url: '/condition/member?flag=true',
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
    url:
      '/data-center/out-of-stock-info?page=' +
      filters.page +
      '&pageSize=' +
      filters.pageSize,
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
  const data = { condition: param }
  return request({
    url: '/report/sales',
    method: 'post',
    data
  })
}

export function getDevelop(param) {
  const data = { condition: param }
  return request({
    url: '/report/develop',
    method: 'post',
    data
  })
}

export function getPurchase(param) {
  const data = { condition: param }
  return request({
    url: '/report/purchase',
    method: 'post',
    data
  })
}

export function getPossess(param) {
  const data = { condition: param }
  return request({
    url: '/report/possess',
    method: 'post',
    data
  })
}
export function getEbaysales(param) {
  const data = { condition: param }
  return request({
    url: '/report/ebay-sales',
    method: 'post',
    data
  })
}
export function getSalestrend(param) {
  const data = { condition: param }
  return request({
    url: '/report/sales-trend',
    method: 'post',
    data
  })
}
export function getProfitReport(param) {
  const data = { condition: param }
  return request({
    url: '/report/profit-trend',
    method: 'post',
    data
  })
}
export function getArtist(param) {
  const data = { condition: param }
  return request({
    url: '/report/artist',
    method: 'post',
    data
  })
}
export function getaccount(param) {
  const data = { condition: param }
  return request({
    url: '/report/account',
    method: 'post',
    data
  })
}

export function getSalesdeadfee(param) {
  const data = { condition: param }
  return request({
    url: '/upload/sales-dead-fee',
    method: 'post',
    data
  })
}
export function getUpdateexchange(param) {
  const data = { condition: param }
  return request({
    url: '/settings/exchange',
    method: 'post',
    data
  })
}
export function getToolaccount(param) {
  const data = { condition: param }
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
  const data = { condition: param }
  return request({
    url: '/tool/ebay-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

export function geteBaysku(param) {
  const data = { condition: param }
  return request({
    url: '/tool/ebaysku',
    method: 'post',
    data
  })
}

export function geteBayskutemplate(param) {
  const data = { condition: param }
  return request({
    url: '/tool/ebaysku-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function getsmtsku(param) {
  const data = { condition: param }
  return request({
    url: '/tool/smtsku',
    method: 'post',
    data
  })
}
export function getsmtskutemplate(param) {
  const data = { condition: param }
  return request({
    url: '/tool/smtsku-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function getwishsku(param) {
  const data = { condition: param }
  return request({
    url: '/tool/wishsku',
    method: 'post',
    data
  })
}
export function getwishskutemplate(param) {
  const data = { condition: param }
  return request({
    url: '/tool/wishsku-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function getIntroduce(param) {
  const data = { condition: param }
  return request({
    url: '/report/introduce',
    method: 'post',
    data
  })
}
export function getBrand(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/brand',
    method: 'post',
    data
  })
}
export function getGoodspicture(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/goods-picture?page=' + param.page,
    method: 'post',
    data
  })
}
export function getOtherDeadFee(param) {
  const data = { condition: param }
  return request({
    url: '/report/other-dead-fee?page=' + param.page,
    method: 'post',
    data
  })
}
export function getPerform(param) {
  const data = { condition: param }
  return request({
    url: '/perform/perform',
    method: 'post',
    data
  })
}
export function getPsales(param) {
  const data = { condition: param }
  return request({
    url: '/perform/sales',
    method: 'post',
    data
  })
}
export function getSalesChange(param) {
  const data = { condition: param }
  return request({
    url: '/data-center/sales-change?page=' + param.page + '&sort=' + param.sort,
    method: 'post',
    data
  })
}
export function priceTrend(param) {
  const data = { condition: param }
  return request({
    url: '/data-center/price-trend',
    method: 'post',
    data
  })
}
export function getPerformcost(param) {
  const data = { condition: param }
  return request({
    url: '/perform/cost',
    method: 'post',
    data
  })
}
// 定价器
export function getUkfic(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/uk-fic',
    method: 'post',
    data
  })
}
export function getExpressTracking(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/express-tracking',
    method: 'post',
    data
  })
}
export function getUK(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/uk',
    method: 'post',
    data
  })
}
export function getAU(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/au',
    method: 'post',
    data
  })
}
export function getOrder(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/declared-value',
    method: 'post',
    data
  })
}
export function getPaypal(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/exception-pay-pal',
    method: 'post',
    data
  })
}
export function getEdition(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/exception-edition',
    method: 'post',
    data
  })
}
export function getRefund(param) {
  const data = { condition: param }
  return request({
    url: '/report/refund',
    method: 'post',
    data
  })
}
export function getDeadFee(param) {
  const data = { condition: param }
  return request({
    url: '/report/dead-fee?page=' + param.page,
    method: 'post',
    data
  })
}
export function getExtraFee(param) {
  const data = { condition: param }
  return request({
    url: '/report/extra-fee?page=' + param.page,
    method: 'post',
    data
  })
}
// 订单量走势
export function APIOrderCount(param) {
  const data = { condition: param }
  return request({
    url: '/report/order-count',
    method: 'post',
    data
  })
}
// 销售数量走势
export function APISkuCount(param) {
  const data = { condition: param }
  return request({
    url: '/report/sku-count',
    method: 'post',
    data
  })
}
//获取属性信息包装规格
export function getAttributeInfoPackName() {
  return request({
    url: 'oa-goodsinfo/attribute-info-pack-name',
    method: 'get'
  })
}
//获取属性信息特殊属性
export function getAttributeInfoSpecialAttribute() {
  return request({
    url: 'oa-goodsinfo/attribute-info-special-attribute',
    method: 'get'
  })
}
//获取属性信息仓库
export function getAttributeInfoStoreName() {
  return request({
    url: 'oa-goodsinfo/attribute-info-store-name',
    method: 'get'
  })
}
//获取属性信息季节
export function getAttributeInfoSeason() {
  return request({
    url: 'oa-goodsinfo/attribute-info-season',
    method: 'get'
  })
}
//获取属性信息禁售平台
export function getAttributeInfoPlat() {
  return request({
    url: 'oa-goodsinfo/attribute-info-plat',
    method: 'get'
  })
}
export function getForbidPlat() {
  return request({
    url: 'oa-goodsinfo/plat-forbid-plat',
    method: 'get'
  })
}
//获取属性信息对应销售
export function getAttributeInfoSalesman() {
  return request({
    url: 'oa-goodsinfo/attribute-info-salesman',
    method: 'get'
  })
}
//获取属性信息主类目
export function getAttributeInfoCat() {
  return request({
    url: 'oa-goodsinfo/attribute-info-cat',
    method: 'get'
  })
}
//获取属性信息子类目
export function getAttributeInfoSubCat() {
  return request({
    url: 'oa-goodsinfo/attribute-info-sub-cat',
    method: 'get'
  })
}
//获取平台信息产品状态
export function getPlatGoodsStatus() {
  return request({
    url: 'oa-goodsinfo/plat-goods-status',
    method: 'get'
  })
}
//获取平台信息完善的平台
export function getPlatCompletedPlat() {
  return request({
    url: 'oa-goodsinfo/plat-completed-plat',
    method: 'get'
  })
}
//获取平台信息所有账号
export function getPlatEbayAccount() {
  return request({
    url: 'oa-goodsinfo/plat-ebay-account',
    method: 'get'
  })
}
//获取平台信息所有仓储
export function getPlatEbayStore() {
  return request({
    url: 'oa-goodsinfo/plat-ebay-store',
    method: 'get'
  })
}
export function getPickMembe() {
  return request({
    url: 'warehouse-tools/pick-member',
    method: 'get'
  })
}
export function APIPick(param) {
  const data = { condition: param }
  return request({
    url: 'warehouse-tools/pick',
    method: 'post',
    data
  })
}
//获取平台信息站点
export function getEbaySite() {
  return request({
    url: 'oa-goodsinfo/ebay-site',
    method: 'get'
  })
}
export function getEbayVirtualStore(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/ebay-virtual-store?page=' + param.page,
    method: 'post',
    data
  })
}



