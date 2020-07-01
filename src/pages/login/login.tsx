import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { setStorageSync , getStorageSync, getAccountInfo} from '@/utils/auth'
import { appLogin, getMiniAppInfo } from '@/servers/servers.js'
import './login.scss'

export default class Login extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登录',
  }

  constructor(props){
    super(props)
  }
  async getMiniAppInfo (sessionKey, userId, userInfo) {
    const { encryptedData, iv, rawData, signature } = userInfo.detail
    const appid = (await getAccountInfo()).miniProgram.appId
    const res = await getMiniAppInfo({
      sessionKey,
      encryptedData,
      iv,
      rawData,
      signature,
      appid,
      userId
    })
    res.code === 200 && setStorageSync('userInfo', res.data) && Taro.navigateBack()
  }
  async doLogin (userInfo) {
      const loginInfo = await Taro.login()
      const code = loginInfo.code
      const res = await appLogin({
        code: code,
        type: '02'
      })

     if (res.code === 200) {
       if (!await getStorageSync('userInfo')) {
          this.getMiniAppInfo (res.data.sessionKey, res.data.id, userInfo)
       } else {
        Taro.navigateBack()
       }
     } else {
       Taro.showToast({
          title: '登陆失败',
          icon: 'none',
          duration: 1500
       })
     }
  }
  getUserInfo(userInfo){
    if (userInfo.detail.errMsg === 'getUserInfo:ok') {
      this.doLogin(userInfo)
    } 
  }
  componentWillMount () { }

  componentDidMount () {
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='login'>
        <AtButton type='primary' openType='getUserInfo' onGetUserInfo={this.getUserInfo.bind(this)}>微信一键登录</AtButton>
      </View>
    )
  }
}
