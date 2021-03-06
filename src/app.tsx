import Taro, { Component, Config } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

export default class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/user/user',
      'pages/userInfo/user-info',
      'pages/sign/sign',
      'pages/orgSign/orgSign',
      'pages/child/child',
      'pages/cate/cate',
      'pages/cateDetail/cate-detail',
      'pages/buyerShow/buyer-show',
      'pages/buyerShowDetail/buyer-show-detail',
      'pages/publishShow/publish-show',
      'pages/buyCar/buy-car',
      'pages/search/search',
      'pages/detail/detail',
      'pages/orgInfomation/orgInfomation',
      'pages/rateDetail/rate-detail',
      'pages/orderConfirm/order-confirm',
      'pages/myChild/my-child',
      'pages/login/login',
      'pages/bindPhoneNumber/bind-phone-number',
      'pages/myAddress/my-address',
      'pages/addAddress/add-address',
      'pages/hotelMerchant/hotel-merchant',
      'pages/merchantSign/merchant-sign',
      'pages/myMembers/my-members',
      'pages/myEarning/my-earning',
      'pages/myInviteCode/my-invite-code',
      'pages/cashMoney/cash-money',
      'pages/cashLog/cash-log',
      'pages/cashDetail/cash-detail',
      'pages/myShow/my-show',
      'pages/orderManagement/order-management',
      'pages/orderDetail/order-detail',
      'pages/test/test'
    ],
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
      }
    },
    "plugins": {
      "wxparserPlugin": {
        "version": "0.3.0",
        "provider": "wx9d4d4ffa781ff3ac"
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      // enablePullDownRefresh:true
    },
    tabBar:{
      color: "#666",
      selectedColor: "#47cab3",
      backgroundColor: "#fafafa",
      list:[
        {
          pagePath:'pages/index/index',
          text:'首页',
          iconPath: "./assets/tab-bar/home.png",
          selectedIconPath: "./assets/tab-bar/home-active.png",
        },
        {
          pagePath:'pages/cate/cate',
          text:'分类',
          iconPath: "./assets/tab-bar/cate.png",
          selectedIconPath: "./assets/tab-bar/cate-active.png",
        },
        {
          pagePath:'pages/buyerShow/buyer-show',
          text:'买家秀',
          iconPath: "./assets/tab-bar/application.png",
          selectedIconPath: "./assets/tab-bar/application-active.png",
        },
        {
          pagePath:'pages/buyCar/buy-car',
          text:'购物车',
          iconPath: "./assets/tab-bar/cart.png",
          selectedIconPath: "./assets/tab-bar/cart-active.png",
        },
        {
          pagePath:'pages/user/user',
          text:'我的',
          iconPath: "./assets/tab-bar/user.png",
          selectedIconPath: "./assets/tab-bar/user-active.png",
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
