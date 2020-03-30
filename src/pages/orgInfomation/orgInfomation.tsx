import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtToast,AtGrid } from 'taro-ui'
import './orgInfomation.scss'

export default class OrgInfomation extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '机构简介',
  }
  state = {
    isOpened:false,
    isCourseOpend:false,
    toastText:'',
  }

  collect(){
    this.setState({
      isOpened:true ,
      toastText:'收藏成功'
    })
  }
  toastClose(){
    this.setState({
      isOpened:false ,
    })
  }
  componentWillMount () { 
    console.log(this.$router.params) 
  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { isOpened,toastText} = this.state ;
    return (
      <View className='orgInfomation'>
        <View className='head'>
          <View className='org-name'>子启新教育机构</View>
          <View onClick={this.collect.bind(this)} className='collect'>收藏</View>
        </View>
        <View className='content'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
        </View>
        <AtToast isOpened={isOpened} onClose={this.toastClose.bind(this)} text={toastText} status='success' duration={2000}></AtToast>
      </View>
    )
  }
}
