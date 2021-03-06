
import Taro from '@tarojs/taro'
/* eslint-disable import/prefer-default-export */
import { stringQuery } from '@/utils/index'
import { getStorageSync } from '@/utils/auth'
import HTTPREQUEST from "./http"
import getBaseUrl from './baseUrl'
// 产品相关接口前缀
const product_prefix = '/product/base'
// 分类相关接口前缀
const category_prefix = '/conf/base'
// 文件相关接口前缀
const file_prefix = '/file/handler'
// 用户相关接口前缀
const user_perfix = '/user'
// 订单相关接口
const order_perfix = '/order/base'

// 公开文件上传地址
export const uploadFile = async (path, formData = {}) => {
  return Taro.uploadFile({
    url: `${getBaseUrl()}${file_prefix}/publicUpload`,
    filePath: path,
    name: 'file',
    formData: {
      name: 'file'
    },
    header: {
      'userId': await getStorageSync('userId'),
      'Content-Type': 'multipart/form-data',
    }
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
// 买家秀保存接口
export const saveBuyShow = (postData) => {
  return HTTPREQUEST.post(`${user_perfix}/show/userBuyingShow/save`, postData)
}
// 用户登录接口
export const appLogin = (postData) => {
  return HTTPREQUEST.get(`${user_perfix}/base/userInfo/miniAppLogin`, postData)
}
// 获取小程序用户信息
export const getMiniAppInfo = (postData) => {
  return HTTPREQUEST.post(`${user_perfix}/base/userInfo/getMiniAppInfo`, postData)
}
// 获取用户信息
export const getUserInfoByParam = (postData) => {
  return HTTPREQUEST.get(`${user_perfix}/base/userInfo/getByParam`, postData)
}
// 完善用户信息
export const editUserInfo = (postData) => {
  return HTTPREQUEST.post(`${user_perfix}/base/userInfo/editUserInfo`, postData)
}

//根据产品id获取详情信息
export const getProductInfoById = (postData) => {
  return HTTPREQUEST.get(`${product_prefix}/MobileProductInfo/getById`, postData)
}
// 根据产品id获取产品图文详情
export const getProductRichText = (postData) => {
  return HTTPREQUEST.get(`${product_prefix}/MobileProductDetail/getByParams`, postData)
}
//根据产品id获取产品辅图
export const getProductImageById = (postData) => {
  return HTTPREQUEST.get(`${product_prefix}/MobileProductImage/getByProductId`, postData)
}
// 获取产品sku组合
export const getSkuItemByProductId = (postData) => {
  return HTTPREQUEST.get(`${product_prefix}/MobileProductSkuItem/getByProductId`, postData)
}
// 加入购物车
export const addShopCar = (postData) => {
  return HTTPREQUEST.post(`${user_perfix}/base/userShopcart/save`, postData)
}
// 删除购物车
export const deleteShopCar = (postData) => {
  return HTTPREQUEST.post(`${user_perfix}/base/userShopcart/delete`, postData)
}
//分页获取用户购物车
export const getUserShopCarList = (postData) => {
  return HTTPREQUEST.get(`${user_perfix}/base/userShopcart/getByPage`, postData)
}
// 用户收货地址列表
export const getUserAddressList = (postData) => {
  return HTTPREQUEST.get(`${user_perfix}/base/userReceiveAddress/getByUserId`, postData)
}
// 用户地址保存
export const saveUserAddress = (postData) => {
  return HTTPREQUEST.post(`${user_perfix}/base/userReceiveAddress/save`, postData)
}
// 用户地址修改
export const editUserAddress = (postData) => {
  return HTTPREQUEST.post(`${user_perfix}/base/userReceiveAddress/edit`, postData)
}
// 根据id获取地址详情
export const getAddressDetailById = (postData) => {
  return HTTPREQUEST.get(`${user_perfix}/base/userReceiveAddress/getById`, postData)
}
// 删除用户地址
export const deleteUserAddressById = (postData) => {
  return HTTPREQUEST.get(`${user_perfix}/base/userReceiveAddress/deleteUserReceiveAddress`, postData)
}

// 订单下单接口
export const placeOrderSave = (postData) => {
  return HTTPREQUEST.post(`${order_perfix}/MobileOrderInfo/save`, postData)
}
