import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtButton,AtGrid } from 'taro-ui'
import './buyer-show.scss'

export default class BuyerShow extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '买家秀',
  }

  state = {

  }
  clickPublish () {
    Taro.navigateTo({
      url:'/pages/publishShow/publish-show'
    })
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  

  render () {
    console.log('buyer-show render')

    return (
      <View className='buyer-show'>
          <View className='buy-header'>
            <AtButton type='primary' onClick={this.clickPublish.bind(this)}>发布买家秀</AtButton>
          </View>
      </View>

    )
  }
}
