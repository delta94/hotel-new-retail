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
          <View className="people-watch">
            <View className="text">大家都在看</View>
            <View className="list-wrap">
              <ScrollXView list={list}>

              </ScrollXView >
            </View>
          </View>
        )
    }
}
