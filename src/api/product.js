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
export function reverseList1(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goods/backward-list?page=' + param.page2,
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
    url: '/oa-goodsinfo/attributes-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIPictureList(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/picture-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIPlatList(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat-list?page=' + param.page,
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
    url: '/oa-goodsinfo/save-attribute',
    method: 'post',
    data
  })
}
export function APISaveFinishAttribute(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/save-finish-attribute',
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
export function APIWishSuffix(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/wish-suffix?page=' + param.page,
    method: 'post',
    data
  })
}
export function APICreateWish(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/create-wish',
    method: 'post',
    data
  })
}
export function APIDeleteWish(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/delete-wish',
    method: 'post',
    data
  })
}
export function APIJoomSuffix(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/joom-suffix?page=' + param.page,
    method: 'post',
    data
  })
}
export function APICreateJoom(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/create-joom',
    method: 'post',
    data
  })
}
export function APICreateEbay(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/create-ebay',
    method: 'post',
    data
  })
}
export function APIJoomInfo(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/joom-info',
    method: 'post',
    data
  })
}
export function APIEbayInfo(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/ebay-info',
    method: 'post',
    data
  })
}
export function APIWishInfo(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/wish-info',
    method: 'post',
    data
  })
}
export function APIShippingInfo(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/shipping-info',
    method: 'post',
    data
  })
}
export function APIContrastInfo(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/contrast-info',
    method: 'post',
    data
  })
}
export function APIRulesInfo(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/rules-info',
    method: 'post',
    data
  })
}
export function APIDeleteJoom(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/delete-joom',
    method: 'post',
    data
  })
}
export function APIDeleteEbay(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/delete-ebay',
    method: 'post',
    data
  })
}
export function APIDeleteShipping(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/delete-shipping',
    method: 'post',
    data
  })
}
export function APIDeleteContrast(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/delete-contrast',
    method: 'post',
    data
  })
}
export function APIDeleteRules(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/delete-rules',
    method: 'post',
    data
  })
}
export function APIUpdateJoom(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/update-joom',
    method: 'post',
    data
  })
}
export function APIUpdateShipping(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/update-shipping',
    method: 'post',
    data
  })
}
export function APIUpdateContrast(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/update-contrast',
    method: 'post',
    data
  })
}
export function APIUpdateRules(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/update-rules',
    method: 'post',
    data
  })
}
export function APIUpdateWish(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/update-wish',
    method: 'post',
    data
  })
}
export function APIUpdateEbay(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/update-ebay',
    method: 'post',
    data
  })
}
export function APIEbaySuffix(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/ebay-suffix?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIShippingService(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/shipping-service?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIShippingEbay(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/shipping-service',
    method: 'post',
    data
  })
}
export function APIJoomWish(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/joom-wish?page=' + param.page,
    method: 'post',
    data
  })
}
export function APISysRules(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/sys-rules?page=' + param.page,
    method: 'post',
    data
  })
}
export function APICreateShipping(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/create-shipping',
    method: 'post',
    data
  })
}
export function APICreateContrast(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/create-contrast',
    method: 'post',
    data
  })
}
export function APICreateRules(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/create-rules',
    method: 'post',
    data
  })
}
export function APIPaymentList(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/payment-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIPayment(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/payment',
    method: 'post',
    data
  })
}
export function APISavePayment(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/save-payment',
    method: 'post',
    data
  })
}
export function APISupplierRrderList(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/supplier-order-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIDeliveryTemplate(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/delivery-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIRrderAttribute(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/order-attribute',
    method: 'post',
    data
  })
}
export function APISyncQuery(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/sync',
    method: 'post',
    data
  })
}
export function APIPay(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/pay',
    method: 'post',
    data
  })
}
export function APIDelivery(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/delivery',
    method: 'post',
    data
  })
}
export function APIJoomName(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/joom-name',
    method: 'post',
    data
  })
}
export function APIPlatExportWish(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat-export-wish',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIPlatExportEbay(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat-export-ebay',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIPlatExportJoom(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat-export-joom',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIInputExpress(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/input-express',
    method: 'post',
    data
  })
}
export function APICheck(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/check',
    method: 'post',
    data
  })
}
export function APIExportDetail(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/export-detail',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIQuery(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/query?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIQueryDetail(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/query-detail',
    method: 'post',
    data
  })
}
export function APISyncQueryCon(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/sync-query',
    method: 'post',
    data
  })
}
export function APISaveRrderDetail(param) {
  const data = { condition: param }
  return request({
    url: '/supplier-order/save-order-detail',
    method: 'post',
    data
  })
}
export function APIDeleteVariant(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/attribute-info-delete-variant',
    method: 'post',
    data
  })
}
export function APIDeleteEbaySku(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/delete-sku',
    method: 'post',
    data
  })
}
export function APIAttributeToShopElf(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/attribute-to-shop-elf',
    method: 'post',
    data
  })
}
//export function APIDelivery(param) {
//  const data = { condition: param }
//  return request({
//    url: '/supplier-order/delivery',
//    method: 'post',
//    data
//  })
//}


