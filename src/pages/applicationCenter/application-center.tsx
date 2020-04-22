import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtButton,AtGrid } from 'taro-ui'
import './application-center.scss'

export default class ApplicationCenter extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '应用中心',
  }

  state = {

  }


  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handlerClick = async ()=>{ //用箭头函数 在模板中绑定解决this指向问题
    console.log(this)
    // Taro.showToast({
    //   title: '测试一条toast',
    //   icon: 'none'
    // })
    Taro.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        Taro.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      },
      fail(){
        Taro.openSetting({
          'success':(res)=>{
            console.log(res)
          },
          'fail':(res)=>{
            console.log(res)
          }
        })
      }
     })
  }
  signClick = async ()=>{
    Taro.navigateTo({
      url:'/pages/sign/sign'
    })
  }
  orgClick = ()=>{
    Taro.navigateTo({
      url:'/pages/orgSign/orgSign'
    })
  }
  onShareAppMessage (res){
    console.log(res)
    return {
      title: '点点看哟！',
      path: '/pages/user/user?id=123'
    }
  }

  render () {
    console.log('application-center render')

    return (
      <View className='cate'>
          应用页面
          <AtButton className="mt-10" onClick={this.handlerClick} type='primary'>查看地理位置</AtButton>

        {/* <View className='fa fa-clock-o'></View> */}
        <AtButton onClick={this.signClick} type='primary'>家长注册</AtButton>
        <AtButton className="mt-10" onClick={this.orgClick} type='primary'>机构注册</AtButton>
      </View>

    )
  }
}
