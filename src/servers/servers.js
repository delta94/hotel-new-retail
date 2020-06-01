/* eslint-disable import/prefer-default-export */
import HTTPREQUEST from "./http"

// 首页banner
export const getIndexBanner = (postData) => {
  return HTTPREQUEST.get('/dict/getIndexBanner', postData)
}
