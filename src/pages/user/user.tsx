import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import { checkSessionLogin, getStorageSync } from '@/utils/auth'
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
        path: '/pages/orderManagement/order-management',
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
        path: '/pages/myShow/my-show'
      },
      {
        name: '退货/售后服务',
        path: '/pages/returnChangeGoods/return-change-goods'
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
    ],
    headImage: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
  }
  clickItem (item) {
    checkSessionLogin(()=>{
      Taro.navigateTo({
        url: item.path
      })
    })
  }
  clickUserInfo () {
    checkSessionLogin(()=>{
      Taro.navigateTo({
        url: '/pages/userInfo/user-info'
      })
    })
  }
  async getHeadImage() {
    const headImage = await getStorageSync('headImage')
    if (headImage) {
      this.setState({
        headImage
      })
    }
  }
  componentWillMount () {

  }

  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () {
    this.getHeadImage()
  }

  componentDidHide () { }

  render () {
    const { list, headImage } = this.state
    const listItem = list.map(item => {
      return <View className='list-item' key='name' onClick={this.clickItem.bind(this, item)}>
        <View className='icon at-icon at-icon-align-center'></View>
        <View className='list-name'>{item['name']}</View>
      </View>
    })
    return (
      <View className='user'>
        <View className='user-header' onClick={this.clickUserInfo.bind(this)}>
          <AtAvatar image={headImage}></AtAvatar>
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
