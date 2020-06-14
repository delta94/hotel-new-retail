import Taro from '@tarojs/taro'
/* eslint-disable import/prefer-default-export */
import HTTPREQUEST from "./http"
import getBaseUrl from './baseUrl'
// 产品相关接口前缀
const product_prefix = '/product/base'
// 分类相关接口前缀
const category_prefix = '/conf/base'
// 文件相关接口
const file_prefix = '/file/handler'

// 公开文件上传地址
export const uploadFile = (path, formData) => {
  return Taro.uploadFile({
    url: `${getBaseUrl()}${file_prefix}/publicUpload`,
    filePath: path,
    name: 'file',
    formData: formData
  })
}

// 首页banner
export const getIndexBanner = (postData) => {
  return HTTPREQUEST.get('/dict/getIndexBanner', postData)
}
// 首页热卖商品
export const getHotSalePage = (postData) => {
  return HTTPREQUEST.get(`${product_prefix}/MobileProductInfo/getHotSalePage`, postData)
}
// 首页猜你喜欢
export const getGuessYouLikePage = (postData) => {
  return HTTPREQUEST.get(`${product_prefix}/MobileProductInfo/getGuessYouLikePage`, postData)
}

// 一级分类
export const getCategoryParentList = (postData) => {
  return HTTPREQUEST.get(`${category_prefix}/MobileProductCategory/getParentList`, postData)
}
// 二级分类
export const getCategoryChildren = (postData) => {
  return HTTPREQUEST.get(`${category_prefix}/MobileProductCategory/getChildren`, postData)
}
// 产品查询 带查询条件
export const searchProduct = (postData) => {
  return HTTPREQUEST.get(`${product_prefix}/MobileProductInfo/getPageByParams`, postData)
}
