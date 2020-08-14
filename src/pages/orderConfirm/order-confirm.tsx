import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtButton,AtGrid,AtList ,AtListItem} from 'taro-ui'
import './order-confirm.scss'

export default class OrderConfirm extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '确认订单',
  }

  state = {

  }

  openChildList(){
    // Taro.navigateTo({
    //   url: `/pages/myChild/my-child?id=${this.$router.params.id}`
    // })
  }

  componentWillMount () {
    console.log(this.$router.params)
  }

  componentDidMount () {
    console.log(DEV)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log('order-confirm render')
    const orgIcon = require('@/assets/images/org-icon.svg');
    return (
      <View className='order-confirm'>
        <View className='child-list'>
          <AtList  hasBorder={false}>
            <AtListItem title='收货地址' hasBorder={false} note='前往填写收货人,联系号码和地址' arrow='right' onClick={this.openChildList.bind(this)} />
          </AtList>
        </View>
        <View className='course-list'>
          <View className='org'>
            <Image className='img' mode='widthFix'  src={orgIcon} ></Image>
            <View>商品名称</View>
          </View>
          <View className='detail'>
            <Image className='img' mode='widthFix'  src='../../assets/images/banner.jpg' ></Image>
            <View className='course-info'>
              <View className='course-name'>商品名称</View>
              <View className='course-number'>2</View>
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
