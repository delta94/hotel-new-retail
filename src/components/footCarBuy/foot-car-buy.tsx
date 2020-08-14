import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './foot-car-buy.scss';

const home = require('@/assets/tab-bar/home.png');
const costom = require('@/assets/images/costom.png');
const cart = require('@/assets/tab-bar/cart.png');

interface propsType  {
  showSkuSheet?:Function
}

export default class FooterCarBuy extends Component<propsType> {
    constructor(props){
        super(props)
    }
    static externalClasses = ['contcat-btn']
    state = {

    }
    goIndex () {
      Taro.switchTab({
        url:`/pages/index/index`
      })
    }
    contact () {

    }
    goBuyCar () {
      Taro.switchTab({
        url:`/pages/buyCar/buy-car`
      })
    }
    showSkuSheet(type){
      const { showSkuSheet } = this.props
      showSkuSheet && showSkuSheet(type)
    }

    componentWillMount(){

    }
    render() {

        return (
          <View className='footer-car-buy'>
            <View className='icon-list'>
              <View onClick={this.goIndex.bind(this)} className='icon-item icon-home'>
                <Image className='img' mode='widthFix'  src={home}></Image>
              </View>
              <View className='icon-item icon-costom'>
                <AtButton className='contcat-btn' type='primary' openType='contact' onContact={this.contact.bind(this)}>
                </AtButton>
                <Image className='img' mode='widthFix'  src={costom}></Image>
              </View>
              <View onClick={this.goBuyCar.bind(this)} className='icon-item icon-cart'>
                <Image className='img' mode='widthFix'  src={cart}></Image>
              </View>
            </View>
            <View className='car-buy'>
              <View onClick={this.showSkuSheet.bind(this, 'car')} className='add-car'>加入购物车</View>
              <View onClick={this.showSkuSheet.bind(this, 'buy')} className='add-buy'>立即购买</View>
            </View>
          </View>
        )
    }
}
