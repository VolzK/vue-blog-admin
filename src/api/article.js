import request from '@/utils/request'

// 列表
export function fetchList(query) {
  return request({
    baseURL: 'http://127.0.0.1:9090/api/',
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 获取文章
export function fetchArticle(query) {
  return request({
    baseURL: 'http://127.0.0.1:9090/api/',
    url: '/article/' + query,
    method: 'get'
  })
}

// 删除文章
export function deleteArticleById(query) {
  return request({
    baseURL: 'http://127.0.0.1:9090/api/',
    url: '/article/delete/' + query,
    method: 'get'
  })
}

// 保存文章
export function saveArticle(data) {
  return request({
    baseURL: 'http://127.0.0.1:9090/api/',
    url: '/article/save',
    method: 'post',
    data: data
  })
}

// 修改文章
export function updateArticle(data) {
  return request({
    baseURL: 'http://127.0.0.1:9090/api/',
    url: '/article/update',
    method: 'post',
    data: data
  })
}

