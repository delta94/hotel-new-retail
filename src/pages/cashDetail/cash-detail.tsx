import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtModal } from 'taro-ui'
import { commafy } from '@/utils/index'
import './cash-detail.scss'

export default class CashDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '提现详情',
  }

  state = {

  }
  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    return (
        <View className='cash-detail'>
          <View className='amount'>{commafy(665656.34)}</View>
          <View>交易成功</View>
          <View className='content'>
            <View className='content-item'>
              <View className='content-item-title'>提现方式</View>
              <View className='content-item-content'>微信</View>
            </View>

            <View className='content-item'>
              <View className='content-item-title'>提现账号</View>
              <View className='content-item-content'>66**********34</View>
            </View>

            <View className='content-item'>
              <View className='content-item-title'>创建时间</View>
              <View className='content-item-content'>2020-6-4 12:23</View>
            </View>

            <View className='content-item'>
              <View className='content-item-title'>订单号</View>
              <View className='content-item-content'>09238493493545454</View>
            </View>

            <View className='content-item'>
              <View className='content-item-title'>对此单有疑问</View>
              <View className='content-item-content'><AtButton openType='contact'>&gt;</AtButton></View>
            </View>
          </View>
        </View>
    )
  }
}
