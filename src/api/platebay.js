import request from '@/utils/request'

export function APISaveEbayInfo(param) {
    const data = { condition: param }
    return request({
        url: '/oa-goodsinfo/save-ebay-info',
        method: 'post',
        data
    })
}
