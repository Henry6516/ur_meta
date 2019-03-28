import request from '@/utils/request'

export function goodsList(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/list?page=' + param.page,
    method: 'post',
    data
  })
}
export function goodsCreate(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/create',
    method: 'post',
    data
  })
}
export function goodsUpdate(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/update',
    method: 'put',
    data
  })
}
export function goodsInfo(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/info',
    method: 'post',
    data
  })
}
export function goodsDelete(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/delete',
    method: 'delete',
    data
  })
}
export function goodsClaim(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/claim',
    method: 'post',
    data
  })
}
export function forwardList(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/forward-list?page=' + param.page1,
    method: 'post',
    data
  })
}
export function forwardCreate(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/dev-create',
    method: 'post',
    data
  })
}
export function forwardUpdate(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/dev-update',
    method: 'put',
    data
  })
}
export function forwardSubmit(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/submit',
    method: 'post',
    data
  })
}
export function reverseList(param) {
  const data = { condition: param }
  return request({
    url: '/backward-develop/list?page=' + param.page2,
    method: 'post',
    data
  })
}
export function reverseCreate(param) {
  const data = { condition: param }
  return request({
    url: '/backward-develop/create',
    method: 'post',
    data
  })
}
export function reverseUpdate(param) {
  const data = { condition: param }
  return request({
    url: '/backward-develop/update',
    method: 'put',
    data
  })
}
export function checkList(param) {
  const data = { condition: param }
  return request({
    url: '/check/check-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function checkPassList(param) {
  const data = { condition: param }
  return request({
    url: '/check/pass-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function checkPass(param) {
  const data = { condition: param }
  return request({
    url: '/check/pass',
    method: 'post',
    data
  })
}
export function checkFailed(param) {
  const data = { condition: param }
  return request({
    url: '/check/failed',
    method: 'post',
    data
  })
}
export function checkCancel(param) {
  const data = { condition: param }
  return request({
    url: '/check/cancel',
    method: 'post',
    data
  })
}
export function checkFailedList(param) {
  const data = { condition: param }
  return request({
    url: '/check/failed-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIGoodsInfo(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/attributes-list',
    method: 'post',
    data
  })
}
export function APIPictureList(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/picture-list',
    method: 'post',
    data
  })
}
export function APIPlatList(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat-list',
    method: 'post',
    data
  })
}
export function APIAttribute(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/attribute',
    method: 'post',
    data
  })
}
export function APIAttributeInfo(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/attribute-info',
    method: 'post',
    data
  })
}
export function APIFinishAttribute(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/finish-attribute',
    method: 'post',
    data
  })
}
export function APISaveAttribute(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/save-attribute-info',
    method: 'post',
    data
  })
}
export function APIGenerateCode(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/generate-code',
    method: 'post',
    data
  })
}
export function APIPictureInfo(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/picture-info',
    method: 'post',
    data
  })
}
export function APIPicturePreview(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/picture',
    method: 'post',
    data
  })
}
export function APISavePictureInfo(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/save-picture-info',
    method: 'post',
    data
  })
}
export function APIFinishPicture(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/finish-picture',
    method: 'post',
    data
  })
}
export function APIPictureToFtp(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/picture-to-ftp',
    method: 'post',
    data
  })
}
export function APIPlat(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat',
    method: 'post',
    data
  })
}
export function APIPlatInfo(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat-info',
    method: 'post',
    data
  })
}
export function APISaveWishInfo(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/save-wish-info',
    method: 'post',
    data
  })
}
export function APIFinishPlat(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/finish-plat',
    method: 'post',
    data
  })
}
export function APISupplierList(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/supplier-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function APICreateSupplier(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/create-supplier',
    method: 'post',
    data
  })
}
export function APIDetail(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/attribute',
    method: 'post',
    data
  })
}
export function APIDelete(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/attribute?id=' + param.id,
    method: 'delete',
    data
  })
}
export function APIUpdateSupplier(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/update-supplier',
    method: 'post',
    data
  })
}
export function APISupplierGoodsList(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/supplier-goods-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function APICreateGoods(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/create-goods',
    method: 'post',
    data
  })
}
export function APIUpdateGoods(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/update-goods',
    method: 'post',
    data
  })
}
export function APIGoodsAttribute(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/goods-attribute',
    method: 'post',
    data
  })
}
export function APIGoodsDelelte(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/goods-attribute?id=' + param.id,
    method: 'delete',
    data
  })
}
export function APIPySupplierList(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/py-supplier-list',
    method: 'post',
    data
  })
}
export function APIDeleteSku(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/delete-sku',
    method: 'post',
    data
  })
}
export function APISupplier(param) {
  const data = { condition: param }
  return request({
    url: '/supplier/supplier',
    method: 'post',
    data
  })
}
