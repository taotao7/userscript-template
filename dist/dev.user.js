// ==UserScript==
// @name        aone-helper [dev]
// @description a aone helper
// @namespace   github.com/taotao7
// @require     http://libs.baidu.com/jquery/1.8.3/jquery.min.js
// @require     https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/layer.js
// @resource    0 http://cdn.bootcdn.net/ajax/libs/layer/3.1.1/theme/default/layer.css
// @match       https://www.google.com.hk/*
// @match       https://aone.alibaba-inc.com/*
// @version     0.0.1
// @homepage    https://github.com/taotao7/Aone-Helper
// @author      taotao7
// @license     MIT
// @grant       GM_log
// @grant       GM_listValues
// @grant       GM_getValue
// @grant       Gm_setValue
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       unsafeWindow
// @grant       GM.xmlHttpRequest
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==
/*  globals GM */

'use strict';

(function () {
  const url = `http://localhost:8124/bundle.user.js?${Date.now()}`
  new Promise(function loadBundleFromServer (resolve, reject) {
    const req = GM.xmlHttpRequest({
      method: 'GET',
      url: url,
      onload: function (r) {
        if (r.status !== 200) {
          return reject(r)
        }
        resolve(r.responseText)
      },
      onerror: e => reject(e)
    })
    if (req && 'catch' in req) {
      req.catch(e => { /* ignore */ })
    }
  }).catch(function (e) {
    const log = function (obj, b) {
      let prefix = 'loadBundleFromServer: '
      try {
        prefix = GM.info.script.name + ': '
      } catch (e) {}
      if (b) {
        console.log(prefix + obj, b)
      } else {
        console.log(prefix, obj)
      }
    }
    if (e && 'status' in e) {
      if (e.status <= 0) {
        log('Server is not responding')
        GM.getValue('scriptlastsource3948218', false).then(function (src) {
          if (src) {
            log('%cExecuting cached script version', 'color: Crimson; font-size:x-large;')
            /* eslint-disable no-eval */
            eval(src)
          }
        })
      } else {
        log('HTTP status: ' + e.status)
      }
    } else {
      log(e)
    }
  }).then(function (s) {
    if (s) {
      /* eslint-disable no-eval */
      eval(`${s}
//# sourceURL=${url}`)
      GM.setValue('scriptlastsource3948218', s)
    }
  })
})()