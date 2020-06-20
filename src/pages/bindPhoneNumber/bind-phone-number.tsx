import Taro, { Component, Config} from '@tarojs/taro'
import { View ,Picker} from '@tarojs/components'
import { AtAvatar, AtActionSheet, AtActionSheetItem, AtButton} from 'taro-ui'
import { getUserInfo } from '@/utils/auth'
import './bind-phone-number.scss'

export default class bindPhoneNumber extends Component {

  config: Config = {
    navigationBarTitleText: '绑定手机号码',
  }
  constructor(props){
    super(props)
  }
  state = {
    mobileNo: '',
  }
  getPhoneNumber () {

  }

  componentWillMount () { }

  componentDidMount () {
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='bind-phone-number'>
        <View><View className='icon at-icon at-icon-iphone'></View></View>
        <View className='item unbind'>未绑定手机号码</View>
        <View className='item'>绑定后，能提高账号安全性且新手机号码</View>
        <View className='item'>可用于登录小程序账号</View>
        <View className='btn'>
          <AtButton type='primary' openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber.bind(this)}>立即绑定</AtButton>
        </View>
      </View>
    )
  }
}
