import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import './user.scss'


export default class User extends Component {

  config: Config = {
    navigationBarTitleText: '我的',
  }
  constructor(props){
    super(props)
  }
  state = {
    list: [
      {
        name: '订单管理',
        path: ''
      },
      {
        name: '地址管理',
        path: '/pages/myAddress/my-address'
      },
      {
        name: '我是酒店商家',
        path: '/pages/hotelMerchant/hotel-merchant'
      },
      {
        name: '买家秀',
        path: ''
      },
      {
        name: '退货/售后服务',
        path: ''
      },
      {
        name: '售后服务',
        path: ''
      },
      {
        name: '用户建议',
        path: ''
      },
      {
        name: '测试页面',
        path: '/pages/test/test'
      }
    ]
  }
  clickItem (item) {
    Taro.navigateTo({
      url: item.path
    })
  }
  clickUserInfo () {
    Taro.navigateTo({
      url: '/pages/userInfo/user-info'
    })
  }
  componentWillMount () { }

  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { list } = this.state
    const listItem = list.map(item => {
      return <View className='list-item' key='name' onClick={this.clickItem.bind(this, item)}>
        <View className='icon at-icon at-icon-align-center'></View>
        <View className='list-name'>{item['name']}</View>
      </View>
    })
    return (
      <View className='user'>
        <View className='user-header' onClick={this.clickUserInfo.bind(this)}>
          <AtAvatar image='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'></AtAvatar>
          <View className='user-name'>
            <View>xingxing</View>
            <View className='tip'>点击完善个人信息</View>
          </View>
          <View className='icon at-icon at-icon-chevron-right'></View>
        </View>
        {listItem}
        <View className='loginout-btn'><AtButton type='primary'>退出登录</AtButton></View>
      </View>
    )
  }
}
