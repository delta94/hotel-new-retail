import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem,Text } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import './hotel-same.scss';
import ProductGrid from '@/components/productGrid/product-grid';

export default class HotCourse extends Component {
    constructor(props){
        super(props)
    }
    state = {
      list:[
        {
          id:1,
          mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
          name:'商品',
          character:'课程特点，优点简介',
          price:150
        },
        {
          id:2,
          mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
          name:'商品',
          character:'课程特点，优点简介',
          price:150
        },
        {
          id:3,
          mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
          name:'商品',
          character:'课程特点，优点简介',
          sale_price:199,
          price:129
        },
        {
          id:4,
          mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
          name:'商品',
          character:'课程特点，优点简介',
          sale_price:199,
          price:129
        }
      ],
      sameTitle:[
        {
          name:'枕头'
        },
        {
          name:'床被'
        },
        {
          name:'日用品'
        },
        {
          name:'其他'
        }
      ]
    }
    componentWillMount(){

    }
    render() {
        const {list, sameTitle} = this.state ;
        const titles = sameTitle.map((item)=>{
            return <View className='same-title-item' key={item.name}><View className='same-title-text'>{item.name}</View></View>
        })
        return (
          <View className="hotel-same">
            <View className="text">酒店同款</View>
            <View className="same-title">{titles}</View>
            <ProductGrid list={list}></ProductGrid>
          </View>
        )
    }
}
