import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { setStorageSync } from '@/utils/auth'
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

  getUserInfo(userInfo){
    console.log(userInfo)
    userInfo.detail.errMsg === 'getUserInfo:ok' && setStorageSync('userInfo', userInfo.detail)
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
