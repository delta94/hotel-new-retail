import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtButton,AtGrid,AtList ,AtListItem} from 'taro-ui'
import './cate-detail.scss'

export default class CateDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'NEW RETAIL',
  }

  state = {
    
  }

  openChildList(){
    Taro.navigateTo({
      url: `/pages/myChild/my-child?id=${this.$router.params.id}`
    })
  }
  
  componentWillMount () { 
    console.log(this.$router.params)
  }

  componentDidMount () {
    console.log(DEV)
    
  }

  componentWillUnmount () { 
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log('order-detail render')
    return (
      <View className='cate-detail'>
        
      </View>
    )
  }
}
