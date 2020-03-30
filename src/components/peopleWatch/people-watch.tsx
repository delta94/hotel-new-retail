import Taro, { Component } from '@tarojs/taro'
import { View,Image ,Text,ScrollView } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import './people-watch.scss';

export default class PeopleWatch extends Component {
    constructor(props){
        super(props)
    }
    state = {
      list:[
        {
          id:1,
          url:require('../../assets/images/hot-course1.svg'),
          name:'课程名称',
          character:'课程特点，优点简介',
          price:150
        },
        {
          id:2,
          url:require('../../assets/images/hot-course1.svg'),
          name:'课程名称',
          character:'课程特点，优点简介',
          price:150
        },
        {
          id:3,
          url:require('../../assets/images/hot-course1.svg'),
          name:'课程名称',
          character:'课程特点，优点简介',
          sale_price:199,
          price:129
        },
        {
          id:4,
          url:require('../../assets/images/hot-course1.svg'),
          name:'课程名称',
          character:'课程特点，优点简介',
          sale_price:199,
          price:129
        }
      ],
    }
    clickCourse(item){
      Taro.navigateTo({
        url:`/pages/courseDetail/course-detail?id=${item.id}`
      })
    }
    componentWillMount(){
      
    }
    render() {
        const {list} = this.state ;
        const courses = list.map((item)=>{
          return <View className="list-item" key={item.id} onClick={this.clickCourse.bind(this,item)}>
                    <Image className="img" mode="widthFix"  src={item.url} ></Image>
                    <View className="desc">
                      <View className="name">{item.name}</View>
                      <View className="price-container">
                        <Text className={`price ${item.sale_price?"sale_price":''}`}>¥{item.price}</Text> 
                        {item.sale_price && <Text className="discount_price">¥{item.sale_price}</Text>} 
                      </View>
                    </View>
                 </View>
        })
        return (
          <View className="people-watch">
            <View className="text">大家都在看</View>
            <View className="list-wrap">
              <ScrollView scrollX className="list-container">
                {courses}
              </ScrollView>
            </View>
          </View>        
        )
    }
}