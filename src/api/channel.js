import request from '@/utils/request'

// 菜单列表
export function fetchList(query) {
  return request({
    baseURL: "http://localhost:9090/api/",
    url: '/channel/list?title=' + query,
    method: 'get',
    // params: query
  })
}

// 获取单个菜单
export function fetchChannelById(query) {
  return request({
    baseURL: "http://localhost:9090/api",
    url: '/channel/' + query,
    method: 'get',
    // params: query
  })
}


// 新增菜单
export function createChannel(query) {
  return request({
    baseURL: "http://localhost:9090/api",
    url: '/channel/create',
    method: 'post',
    data: query
  })
}

// 修改菜单
export function updateChannel(query) {
  return request({
    baseURL: "http://localhost:9090/api",
    url: '/channel/update',
    method: 'post',
    data: query  // post请求使用data
  })
}

// 删除菜单
export function deleteChannel(query) {
  return request({
    baseURL: "http://localhost:9090/api",
    url: '/channel/delete/' + query,
    method: 'get',
    // params: query
  })
}
