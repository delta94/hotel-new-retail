import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem,Text } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import './hot-course.scss';
import ProductGrid from '@/components/productGrid/product-grid';

export default class HotCourse extends Component {
    constructor(props){
        super(props)
    }
    state = {
      list:[
        {
          id:1,
          mainPictureUrl:require('../../assets/images/hot-course1.svg'),
          name:'课程名称',
          character:'课程特点，优点简介',
          price:150
        },
        {
          id:2,
          mainPictureUrl:require('../../assets/images/hot-course1.svg'),
          name:'课程名称',
          character:'课程特点，优点简介',
          price:150
        },
        {
          id:3,
          mainPictureUrl:require('../../assets/images/hot-course1.svg'),
          name:'课程名称',
          character:'课程特点，优点简介',
          sale_price:199,
          price:129
        },
        {
          id:4,
          mainPictureUrl:require('../../assets/images/hot-course1.svg'),
          name:'课程名称',
          character:'课程特点，优点简介',
          sale_price:199,
          price:129
        }
      ],
    }
    componentWillMount(){

    }
    render() {
        const {list} = this.state ;
        return (
          <View className="hot-course">
            <View className="text">热门课程</View>
            <ProductGrid list={list}></ProductGrid>
          </View>
        )
    }
}
