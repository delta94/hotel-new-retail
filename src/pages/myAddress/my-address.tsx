import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtButton,AtGrid } from 'taro-ui'
import './my-address.scss'

export default class MyAddress extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的收货地址',
  }

  state = {
    
  }

  add () {
    Taro.navigateTo({
      url: '/pages/addAddress/add-address'
    })
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log('application-center render')

    return (
      <View className='application-center'>
        暂无收货地址
        <View className='footer fixed fixed-b'>
          <AtButton onClick={this.add.bind(this)} type='primary'>+新增地址</AtButton>
        </View>
      </View>
    )
  }
}
