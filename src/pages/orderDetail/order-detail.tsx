import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtButton,AtGrid,AtList ,AtListItem} from 'taro-ui'
import './order-detail.scss'

export default class OrderDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '订单详情',
  }

  state = {
    
  }

  openChildList(){
    Taro.navigateTo({
      url: `/pages/myChild/my-child?id=${this.$router.params.id}`
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
    console.log('order-detail render')
    const orgIcon = require('../../assets/images/org-icon.svg');
    return (
      <View className='order-detail'>
        <View className='child-list'>
          <AtList  hasBorder={false}>
            <AtListItem title='陈星星' hasBorder={false} note='10岁 123456789' arrow='right' onClick={this.openChildList.bind(this)} />
          </AtList>
        </View>
        <View className='course-list'>
          <View className='org'>
            <Image className='img' mode='widthFix'  src={orgIcon} ></Image>
            <View>奥利奥辅导机构</View>
          </View>
          <View className='course-detail'>
            <Image className='img' mode='widthFix'  src='../../assets/images/recommend1.png' ></Image>
            <View className='course-info'>
              <View className='course-name'>课程名称</View>
              <View className='course-number'>两节</View>
              <View className='course-price'>¥499</View>
            </View>
          </View>
        </View>
        <View className='pay-footer fixed fixed-b'>
          <View className='pay-price'>实付：¥499.00</View>
          <View className='pay-btn'>付款</View>
        </View>
      </View>
    )
  }
}
