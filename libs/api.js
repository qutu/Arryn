'use strict';

import { isBlank } from './underscore'
import { API_ENDPOINT } from './consts'

// lowlevel api
export default {
  Get,
  Post, // Post form via `x-www-form-urlencoded`
  Put,
  Patch,
  Remove,
}

const fetch = window.fetch

function fetchData(type, data, getMode) {
  var endpoint = _endPoint(type)

  if (getMode)
    endpoint += isBlank(data) ? '' : ('?' + _formatForm(data))

  return fetch(endpoint, data)
    .then(checkStatus)
    .then(parseJSON)
    .then(success)
    .catch(errorHandle)

  function checkStatus(res) {
    // Consider 4xx error are custom errors
    // Hide 502 badgateway
    if (res.status >= 200 && res.status < 510)
      return res

    throw new Error(res.statusText)
  }

  function parseJSON(res) {
    return Promise.all([
      res.json(),
      res.headers.get('X-Total')
    ])
  }

  function success(result) {
    if (result[0].errcode)
      throw new Error(result[0].errmsg)

    return Promise.resolve({
      result: result[0],
      total: result[1]
    })
  }

  function errorHandle(err) {
    return Promise.reject(err)
  }
}

function Get(type, query={}) {
  return fetchData(type, query, 'get')
}

function Post(type, data={}) {
  return fetchData(type, {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    'body': _formatForm(data)
  })
}

function Put(type, data={}) {
  return fetchData(type, {
    'method': 'put',
    'body': _formatForm(data)
  })
}

function Patch(type, data={}) {
  return fetchData(type, {
    'method': 'patch',
    'body': _formatForm(data)
  })
}

function Remove(type, data={}) {
  return fetchData(type, {
    'method': 'delete',
    'body': _formatForm(data)
  })
}

// IE 9 +
function _formatForm(obj) {
  // Hardcode `id` must be removed
  if (Array.isArray(obj))
    return obj.map(item => `id=${item}`).join('&')

  return Object.keys(obj)
    .map(key => key === 'headers' ? '' : `${key}=${obj[key]}`)
    .join('&')
}

function _endPoint(type) {
  if (type.indexOf('http') > -1)
    return type
  
  return `${window.location.protocol}//${API_ENDPOINT}/${type}`
}
