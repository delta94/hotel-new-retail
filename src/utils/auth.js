
import Taro from '@tarojs/taro'
// 获取当前账号信息
export const getAccountInfo = async () => {
   return Taro.getAccountInfoSync()
}
export const MAPKEY = 'SO2BZ-5IAKP-UMEDT-LW6XY-WXOFZ-SLBRQ'

export const setStorageSync = async (key, value) => {
  return Taro.setStorageSync(key, value)
}
export const getStorageSync = async (key) => {
  return await Taro.getStorageSync(key)
}
export const checkSessionLogin = async (cb) => {
  const currentPath = `${Taro.getCurrentPages()[0].route}`
  Taro.checkSession({
    success: async ()=>{
      cb&&cb()
    },
    fail: async ()=>{
      Taro.redirectTo({url:`/pages/login/login?path=${currentPath}`})
    }
  })
}
export const getSetting = async (scope) => {
    const res = await Taro.getSetting()
    return res.authSetting[scope]
}
export const openSetting = async () => {
  return Taro.openSetting()
}
export const getUserInfo = async () => {
  let userInfo = await getStorageSync('userInfo') || null
  // let userAuth = null
  // if (!userInfo) userAuth = await getSetting('scope.userInfo')
  // if (userAuth) {
  //   userInfo = await Taro.getUserInfo()
  //   // setStorageSync('userInfo', userInfo)
  // }
  return userInfo
}
export const getLocation = async () => {
  const res = await Taro.getLocation({
    type: 'gcj02'
  })
  return await getLocal(res.latitude, res.longitude)
}

export const getLocal = async (latitude, longitude) => {
  const QQMapWX = require('./qqmap-wx-jssdk.min.js');
  // 实例化API核心类
  const qqmapsdk = new QQMapWX({
      key: MAPKEY
  });
  return new Promise ((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export const getWeixinAddress = async () => {
  const addressAuth = await getSetting('scope.address')
  let addressInfo = null
  if (addressAuth === false) {
    const result = await Taro.showModal({
      title: '请求授权获取通讯地址',
      content: '需要获取您通讯地址，请确认授权',
    })
    if (result.cancel) {
      Taro.showToast({
        title: '拒绝授权',
        icon: 'none',
        duration: 1500
      })
    } else {
      const auth = await openSetting()
      if (auth.authSetting['scope.address'] === true) {
        Taro.showToast({
          title: '授权成功',
          icon: 'none',
          duration: 1500
        })
        addressInfo = await Taro.chooseAddress()
      } else {
        Taro.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 1500
        })
      }
    }
  } else {
    addressInfo = await Taro.chooseAddress()
  }
  return addressInfo
}
export const getCity = async () => {
  const userLocationAuth = await getSetting('scope.userLocation')
  let cityInfo = null
  if(userLocationAuth === false) {
    const result = await Taro.showModal({
      title: '请求授权当前位置',
      content: '需要获取您的地理位置，请确认授权',
    })
    if (result.cancel) {
      Taro.showToast({
        title: '拒绝授权',
        icon: 'none',
        duration: 1500
      })
    } else {
      const auth = await openSetting()
      if (auth.authSetting['scope.userLocation'] === true) {
        Taro.showToast({
          title: '授权成功',
          icon: 'none',
          duration: 1500
        })
        cityInfo = await getLocation()
      } else {
        Taro.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 1500
        })
      }
    }
  } else {
    cityInfo = await getLocation()
  }
  return cityInfo
}
