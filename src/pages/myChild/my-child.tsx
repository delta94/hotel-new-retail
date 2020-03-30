import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtButton,AtGrid,AtList ,AtListItem,AtCheckbox } from 'taro-ui'
import './my-child.scss'

import ChildrenList from '@/components/childrenList/children-list';

export default class ChildList extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的孩子',
  }

  state = {
    
  }

  openChildList(){

  }
  addChildren(){
    Taro.navigateTo({
      url:'/pages/child/child?type=add'
    })
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log('order-detail render')

    return (
      <View className='my-child-list'>
        <ChildrenList></ChildrenList>
        <View  className='creat-btn fixed fixed-b' onClick={this.addChildren.bind(this)}>+新建孩子信息</View>
      </View>
    )
  }
}
