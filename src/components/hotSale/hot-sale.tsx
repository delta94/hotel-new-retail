import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import ScrollXView from '@/components/scrollXView/scrollX-view'
import './hot-sale.scss';

export default class HotSale extends Component {
    constructor(props){
        super(props)
    }
    state = {
      list:[
        {
          mainPictureUrl:require('../../assets/images/hot-sale1.jpg'),
          id:1,
          price:150,
          name:'商品'
        },
        {
          mainPictureUrl:require('../../assets/images/hot-sale1.jpg'),
          id:2,
          price:150,
          name:'商品'
        },
        {
          mainPictureUrl:require('../../assets/images/hot-sale1.jpg'),
          id:3,
          price:150,
          name:'商品'
        }
      ],
      current:0
    }
    slideChange(){
      const {current} = this.state ;
      const length = this.state.list.length-1;
      this.setState({
        current:current === length ? 0 :current + 1
      },()=>{
        // console.log(this.state.current)
      })
    }
    componentWillMount(){

    }
    render() {
      const {list} = this.state ;
        return (
          <View className='hot'>
            <View className='text'>热卖商品</View>
            <View className='container'>
              <ScrollXView list={list} ratio={5}></ScrollXView >
              <View className='slide'>
                <View style={{'left':this.state.current*50+'rpx'}} className='move-block'></View>
              </View>
            </View>
          </View>
        )
    }
}
