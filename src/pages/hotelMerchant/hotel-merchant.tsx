import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './hotel-merchant.scss'
import MerchantAdv from '@/components/merchantAdv/merchant-adv'
import MerchantDetail from '@/components/merchantDetail/merchant-detail'
export default class HotelMerchant extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我是酒店商家',
  }

  state = {
    isMerchant: true
  }

  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { isMerchant } = this.state
    return (
      <View className='hotel-merchant'>
        {!isMerchant ? <MerchantAdv /> :
        <MerchantDetail />}
      </View>
    )
  }
}
