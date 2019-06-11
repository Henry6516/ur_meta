import request from '@/utils/request'
import store from '@/store'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getMyToken() {
  return store.getters.token
}

export function isAdmin() {
  return store.getters.admin
}

export function uploadImage(avatar) {
  const data = {
    avatar
  }
  return request({
    url: '/user/avatar',
    method: 'post',
    data
  })
}

export function uploadFile() {
  const baseUrl = process.env.BASE_API
  const url = '/upload/sales-dead-fee'
  return baseUrl + url
}
export function uploadJoom() {
  const baseUrl = process.env.BASE_API
  const url = '/tiny-tool/upload-joom-tracking'
  return baseUrl + url
}
export function getHeaders() {
  const headers = {}
  headers.Authorization = 'Bearer ' + getMyToken()
  return headers
}

export function getAvatarUrl() {
  const baseUrl = process.env.BASE_API
  const url = '/user/avatar'
  const token = getMyToken()
  return baseUrl + url + '?token=' + token
}

export function fyndiqz() {
  const baseUrl = process.env.BASE_API
  const url = '/tiny-tool/fyndiqz-upload'
  return baseUrl + url
}

export function getRequirementsDeal(condition) {
  return request({
    url:
      'requirements/deal-list?name=' +
      condition.name +
      '&page=' +
      condition.page +
      '&pageSize=' +
      condition.pageSize +
      '&type=' +
      condition.type +
      '&schedule=' +
      condition.schedule +
      '&priority=' +
      condition.priority +
      '&status=' +
      condition.status +
      '&processingPerson=' +
      condition.processingPerson +
      '&creator=' +
      condition.creator +
      '&detail=' +
      condition.detail +
      '&sortProperty=' +
      condition.sortProperty +
      '&sortOrder=' +
      condition.sortOrder,
    method: 'get'
  })
}

export function getRequirementsIndex(condition) {
  return request({
    url:
      'requirements/index?name=' +
      condition.name +
      '&page=' +
      condition.page +
      '&pageSize=' +
      condition.pageSize +
      '&type=' +
      condition.type +
      '&priority=' +
      condition.priority +
      '&schedule=' +
      condition.schedule +
      '&detail=' +
      condition.detail +
      '&creator=' +
      condition.creator +
      '&status=' +
      condition.status +
      '&sortProperty=' +
      condition.sortProperty +
      '&sortOrder=' +
      condition.sortOrder,
    method: 'get'
  })
}

export function getRequirementsFinish(condition) {
  return request({
    url:
      'requirements/completed-list?name=' +
      condition.name +
      '&page=' +
      condition.page +
      '&pageSize=' +
      condition.pageSize +
      '&type=' +
      condition.type +
      '&schedule=' +
      condition.schedule +
      '&priority=' +
      condition.priority +
      '&status=' +
      condition.status +
      '&processingPerson=' +
      condition.processingPerson +
      '&creator=' +
      condition.creator +
      '&detail=' +
      condition.detail +
      '&sortProperty=' +
      condition.sortProperty +
      '&sortOrder=' +
      condition.sortOrder,
    method: 'get'
  })
}

export function getRequirementsExamine(condition) {
  return request({
    url:
      'requirements/examine-list?name=' +
      condition.name +
      '&page=' +
      condition.page +
      '&pageSize=' +
      condition.pageSize +
      '&type=' +
      condition.type +
      '&priority=' +
      condition.priority +
      '&creator=' +
      condition.creator +
      '&detail=' +
      condition.detail +
      '&processingPerson=' +
      condition.processingPerson,
    method: 'get'
  })
}

export function getExamine(data) {
  return request({
    url: '/requirements/examine',
    method: 'post',
    data
  })
}

export function createRequirements(data) {
  return request({
    url: '/requirements',
    method: 'post',
    data
  })
}

export function editRequirements(data) {
  return request({
    url: 'requirements/' + data.id,
    method: 'put',
    data
  })
}

export function deleteRequirements(id) {
  return request({
    url: 'requirements/' + id,
    method: 'delete'
  })
}

export function ShangHaiTarget(param) {
  const data = { condition: param }
  return request({
    url: 'site/profit',
    method: 'post',
    data
  })
}

export function ZhengZhouTarget(param) {
  const data = { condition: param }
  return request({
    url: 'site/zz-profit',
    method: 'post',
    data
  })
}

export function DepartTarget(param) {
  const data = { condition: param }
  return request({
    url: 'site/depart-profit',
    method: 'post',
    data
  })
}

export function DeveloperTarget(param) {
  const data = { condition: param }
  return request({
    url: 'site/dev-profit',
    method: 'post',
    data
  })
}

export function ProsTarget(param) {
  return request({
    url: 'site/pros?plat=' + param,
    method: 'get'
  })
}

export function ProsTargetPm(param) {
  return request({
    url: 'site/sales-ranking?plat=' + param,
    method: 'get'
  })
}

export function Risk(param) {
  var data = { condition: param }
  return request({
    url: '/tiny-tool/risky-order',
    method: 'post',
    data
  })
}

export function BlackList(param) {
  return request({
    url:
      '/tiny-tool/blacklist?pageSize=' +
      param.pageSize +
      '&currentPage=' +
      param.currentPage,
    method: 'get'
  })
}

export function delBlackList(param) {
  return request({
    url: '/tiny-tool/blacklist?id=' + param,
    method: 'delete'
  })
}

export function postBlacklist(param) {
  const data = { data: param }
  return request({
    url: '/tiny-tool/blacklist',
    method: 'post',
    data
  })
}

export function postHandleOrder(param) {
  const data = { data: param }
  return request({
    url: '/tiny-tool/handle-risky-order',
    method: 'post',
    data
  })
}

export function news(data) {
  return request({
    url: '/news/index?page=' + data.page + '&pageSize=' + data.pageSize,
    method: 'get'
  })
}

export function newsCreate(param) {
  const data = param
  return request({
    url: '/news/create',
    method: 'post',
    data,
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function newsEdit(data) {
  return request({
    url: 'news/update?id=' + data.id,
    method: 'put',
    data
  })
}

export function deleteNews(id) {
  return request({
    url: 'news/delete?id=' + id,
    method: 'delete'
  })
}

export function newsTop(param) {
  const data = param
  return request({
    url: '/news/top',
    method: 'post',
    data,
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getAmt(param) {
  const data = { condition: param }
  return request({
    url: 'site/amt',
    method: 'post',
    data
  })
}

export function getZzAmt(param) {
  const data = { condition: param }
  return request({
    url: 'site/zz-amt',
    method: 'post',
    data
  })
}

export function getDepartAmt(param) {
  const data = { condition: param }
  return request({
    url: 'site/depart-amt',
    method: 'post',
    data
  })
}

export function getDevAmt(param) {
  const data = { condition: param }
  return request({
    url: 'site/dev-amt',
    method: 'post',
    data
  })
}

export function APIHeadDpart() {
  return request({
    url: '/site/head-depart',
    method: 'get'
  })
}

export function APIAllDpart() {
  return request({
    url: '/site/all-depart',
    method: 'get'
  })
}

export function APIBranchDpart() {
  return request({
    url: '/site/branch-depart',
    method: 'get'
  })
}
