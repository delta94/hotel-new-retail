import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem,Text} from '@tarojs/components'
import { AtRate,AtButton,AtList, AtListItem } from 'taro-ui'
// import PropTypes from 'prop-types';
import './rate-detail-list.scss'

interface propsType  {
  data: Array<any>
}

// interface RateDetailList {
//   props: propsType,
// }

export default class RateDetailList extends Component<propsType> {

  constructor(props){
      super(props)
  }

  static externalClasses = ['border-class']

  render(){
    const { data = []} = this.props;
    const list = data.map(item=>{
      return <View className='rate-detail-list-item border-class' key={item.content}>
                <View className='user-item'>
                  <View className='user-avatar'>{item.name}</View>
                  <View className='user-name'>{item.nick_name}</View>
                  <AtRate size={15} value={item.rate}  />
                </View>
                <View className='time-course'>
                  <Text>{item.time}</Text>
                  <Text>{item.course}</Text>
                </View>
                <View className='course-content'>
                  {item.content}
                </View>
             </View>
    })
    return (
      <View className='rate-detail-list'>
        {list}
      </View>
    )
  }
}
