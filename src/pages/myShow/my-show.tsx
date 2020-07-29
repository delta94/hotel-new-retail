import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtModal } from 'taro-ui'
import { commafy } from '@/utils/index'
import './my-show.scss'

export default class MyShow extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '买家秀',
  }

  state = {

  }
  clickPublish () {
    Taro.navigateTo({
      url:'/pages/publishShow/publish-show'
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

    return (
        <View className='my-show'>
          <View className='header'>
            <View className=''>共2个作品</View>
            <View className='camera'><View onClick={this.clickPublish.bind(this)} className='icon at-icon at-icon-camera'></View></View>
          </View>
          下面的内容跟买家秀详情可以共用
        </View>
    )
  }
}
