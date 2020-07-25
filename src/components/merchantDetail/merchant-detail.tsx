import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './merchant-detail.scss'

export default class MerchantDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  // config: Config = {
  //   navigationBarTitleText: '我是酒店商家',
  // }

  state = {
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)

  }
  goto (url) {
    Taro.navigateTo({
      url
    })
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    return (
      <View className='merchant-detail'>
        <View className='commission'>
          <View className='commission-text'>佣金比例 3%</View>
        </View>
        <View className='earning'>
          <View className='earning-title'>当前累计收益（元）</View>
          <View className='earning-amount'>0</View>
        </View>
        <View className='item-wrap'>
          <View className='item' onClick={this.goto.bind(this, '/pages/myEarning/my-earning')}>
            <View className='title'>昨日收益（元）</View>
            <View className='amount'>0</View>
          </View>
          <View className='line'></View>
          <View className='item' onClick={this.goto.bind(this, '/pages/myMembers/my-members')}>
            <View className='title'>昨日新增会员</View>
            <View className='amount'>0</View>
          </View>
        </View>
        <View className='deposit' onClick={this.goto.bind(this, '/pages/cashMoney/cash-money')}>
          <View className='deposit-amount'>
            可提现金额 <Text className='amount'>0</Text>元
          </View>
          <View className='deposit-btn'>立即提现 &gt;</View>
        </View>
        <View className='done-item'>
          <View className='item-wrap done-item-wrap'>
            <View className='item'>
              <View className='title'>累计成交订单数</View>
              <View className='amount'>0</View>
            </View>
            <View className='line'></View>
            <View className='item'>
              <View className='title'>累计成交金额</View>
              <View className='amount'>0</View>
            </View>
          </View>
        </View>

        <View onClick={this.goto.bind(this, '/pages/myInviteCode/my-invite-code')} className='footer fixed fixed-b'><AtButton  circle={true}  type='primary'>我的邀请码</AtButton></View>

      </View>
    )
  }
}
