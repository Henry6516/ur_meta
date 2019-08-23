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
    url: '/oa-goods/forward-list?page=' + param.page,
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
    url: '/oa-goods/backward-list?page=' + param.page,
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
export function APIShopifyList(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/shopify-list?page=' + param.page,
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
export function APIShopifySave(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/shopify-save',
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
export function APIShopifyInfo(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/shopify-info',
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
export function APIDeleteShopify(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/shopify-delete',
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
export function APIDownJoom(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/down-joom-tracking-template',
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
export function APIShopifyName() {
  return request({
    url: '/oa-goodsinfo/shopify-accounts',
    method: 'get'
  })
}
export function APIVovaName() {
  return request({
    url: '/oa-goodsinfo/vova-accounts',
    method: 'get'
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
export function APIPlatExportShopify(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat-export-shopify',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIPlatExportVova(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/plat-export-vova',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIDevExportProfit(param) {
  const data = { condition: param }
  return request({
    url: '/report/export-dev-goods-profit',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIExportReplenish(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/export-replenish',
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
export function APIMakePurchasingOrder(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/make-purchasing-order',
    method: 'post',
    data
  })
}
export function APIReportExport(param) {
  const data = { condition: param }
  return request({
    url: '/report/export',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIDeleteAttribute(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/attribute?id=' + param.id,
    method: 'delete',
    data
  })
}
export function APIMineList(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/mine-list?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIMineInfo(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/mine-info',
    method: 'post',
    data
  })
}
export function APICreatePaypal(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/create-paypal',
    method: 'post',
    data
  })
}
export function APIPaypal(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/paypal?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIPaypalInfo(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/paypal-info',
    method: 'post',
    data
  })
}
export function APIUpdatePaypal(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/update-paypal',
    method: 'post',
    data
  })
}
export function APIDeletePaypal(param) {
  const data = { condition: param }
  return request({
    url: '/basic-info/delete-paypal',
    method: 'post',
    data
  })
}
export function APICjMine(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/mine',
    method: 'post',
    data
  })
}
export function APISendToDevelop(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/send-to-develop',
    method: 'post',
    data
  })
}
export function APIMineExport(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/export',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
export function APIMineFinish(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/finish',
    method: 'post',
    data
  })
}
export function APIMineSetPrice(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/set-price',
    method: 'post',
    data
  })
}
export function APISetCat(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/set-cat',
    method: 'post',
    data
  })
}
export function APIDeleteMine(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/delete-mine',
    method: 'post',
    data
  })
}
export function APIMineSave(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/save',
    method: 'post',
    data
  })
}
export function APISaveAndFinish(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/save-and-finish',
    method: 'post',
    data
  })
}
export function APIbindShopSku(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/bind-shop-sku',
    method: 'post',
    data
  })
}
export function APIDeleteDetail(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/delete-detail',
    method: 'post',
    data
  })
}
export function APISaveShopSku(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data-mine/save-shop-sku',
    method: 'post',
    data
  })
}
export function APIScanningLog(param) {
  const data = { condition: param }
  return request({
    url: '/warehouse-tools/scanning-log?page=' + param.page,
    method: 'post',
    data
  })
}
export function APISortLog(param) {
  const data = { condition: param }
  return request({
    url: '/warehouse-tools/sort-log?page=' + param.page,
    method: 'post',
    data
  })
}
export function APITralog(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/joom-tracking-log?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIExpressFare(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/joom-null-express-fare',
    method: 'post',
    data
  })
}
export function APISortkMember() {
  return request({
    url: '/warehouse-tools/sort-member',
    method: 'get'
  })
}
export function APISort(param) {
  const data = { condition: param }
  return request({
    url: 'warehouse-tools/sort',
    method: 'post',
    data
  })
}
export function APIPickMember() {
  return request({
    url: '/warehouse-tools/pick-member',
    method: 'get'
  })
}
export function updateLog(param) {
  const data = { condition: param }
  return request({
    url: '/update-log/list',
    method: 'post',
    data
  })
}
export function APILogSave(param) {
  const data = { condition: param }
  return request({
    url: '/update-log/save',
    method: 'post',
    data
  })
}
export function APILogInfo(param) {
  const data = { condition: param }
  return request({
    url: '/update-log/info',
    method: 'post',
    data
  })
}
export function APILogDelete(param) {
  const data = { condition: param }
  return request({
    url: '/update-log/info-delete',
    method: 'post',
    data
  })
}
// 报表中心
export function APIProduct(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/sales?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIFormWish(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/wish?page=' + param.page,
    method: 'post',
    data
  })
}
export function APIStock() {
  return request({
    url: '/oa-data/stock',
    method: 'get'
  })
}
export function APInoStock() {
  return request({
    url: '/oa-data/nonstock',
    method: 'get'
  })
}
export function APIFormExtend(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/extend',
    method: 'post',
    data
  })
}

export function APISaveFinishPlat(param) {
  const data = { condition: param }
  return request({
    url: '/oa-goodsinfo/save-finish-plat',
    method: 'post',
    data
  })
}

export function APIEbayBalance(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/ebay-balance?page=' + param.page + '&sort=' + param.sort,
    method: 'post',
    data
  })
}

export function APIExportEbayBalance(param) {
  const data = { condition: param }
  return request({
    url: '/tiny-tool/export-ebay-balance',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

export function getProductPerform(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/product-perform?page=' + param.page,
    method: 'post',
    data
  })
}

export function getDevPerform(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/dev-perform',
    method: 'post',
    data
  })
}

export function APIStockPerform(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/stock-perform?page=' + param.page,
    method: 'post',
    data
  })
}

export function APIGlobalMarket(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/global-market',
    method: 'post',
    data
  })
}

export function APICatPerform(param) {
  const data = { }
  return request({
    url: '/oa-data/cat-perform',
    method: 'post',
    data
  })
}

export function APIDataCat(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/cat',
    method: 'post',
    data
  })
}

export function APISalesPerform(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/sales-perform',
    method: 'post',
    data
  })
}

export function APIDevData(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/dev-data',
    method: 'post',
    data
  })
}

export function APIProductPerformExport(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/product-perform-export',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

export function APIStockPerformExport(param) {
  const data = { condition: param }
  return request({
    url: '/oa-data/stock-perform-export',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
