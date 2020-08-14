import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import './people-watch.scss';
import ScrollXView from '@/components/scrollXView/scrollX-view';

export default class PeopleWatch extends Component {
    constructor(props){
        super(props)
    }
    state = {
      list:[
        {
          id:1,
          mainPictureUrl:require('../../assets/images/hot-sale1.jpg'),
          productName:'商品1',
          character:'课程特点，优点简介',
          salePrice: 120,
          price:150
        },
        {
          id:2,
          mainPictureUrl:require('../../assets/images/hot-sale1.jpg'),
          productName:'商品2',
          character:'课程特点，优点简介',
          salePrice: 130,
          price:150
        },
        {
          id:3,
          mainPictureUrl:require('../../assets/images/hot-sale1.jpg'),
          productName:'商品3',
          character:'课程特点，优点简介',
          salePrice:199,
          price:129
        },
        {
          id:4,
          mainPictureUrl:require('../../assets/images/hot-sale1.jpg'),
          productName:'商品4',
          character:'课程特点，优点简介',
          salePrice:199,
          price:129
        }
      ],
    }
    componentWillMount(){

    }
    render() {
        const {list} = this.state ;
        return (
          <View className="people-watch">
            <View className="text">相关推荐</View>
            <View className="list-wrap">
              <ScrollXView list={list}>

              </ScrollXView >
            </View>
          </View>
        )
    }
}
