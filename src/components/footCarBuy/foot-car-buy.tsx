import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import './foot-car-buy.scss';

const home = require('@/assets/tab-bar/home.png');
const costom = require('@/assets/images/costom.png');
const cart = require('@/assets/tab-bar/cart.png');

export default class FooterCarBuy extends Component {
    constructor(props){
        super(props)
    }
    state = {
     
    }
    clickBuy(){
      Taro.navigateTo({
        url:`/pages/orderDetail/order-detail?id=${this.$router.params.id}`
      })
    }
    componentWillMount(){
      
    }
    render() {
       
        return (
          <View className='footer-car-buy'>
            <View className='icon-list'>
              <View className='icon-item icon-home'>
                <Image className='img' mode='widthFix'  src={home}></Image>
              </View>
              <View className='icon-item icon-costom'>
                <Image className='img' mode='widthFix'  src={costom}></Image>
              </View>
              <View className='icon-item icon-cart'>
                <Image className='img' mode='widthFix'  src={cart}></Image>
              </View>
            </View>
            <View className='car-buy'>
              <View className='add-car'>加入购物车</View>
              <View onClick={this.clickBuy.bind(this)} className='add-buy'>立即购买</View>
            </View>
          </View>        
        )
    }
}