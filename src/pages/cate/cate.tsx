import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton ,AtSearchBar,AtInput} from 'taro-ui'
import './cate.scss'

export default class Cate extends Component {


  config: Config = {
    navigationBarTitleText: '分类',
  }

  componentWillMount () { }

  componentDidMount () {

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
    return (
      <View className='cate'>
          分类页面
          <AtButton className="mt-10" onClick={this.handlerClick} type='primary'>查看地理位置</AtButton>

        {/* <View className='fa fa-clock-o'></View> */}
        <AtButton onClick={this.signClick} type='primary'>家长注册</AtButton>
        <AtButton className="mt-10" onClick={this.orgClick} type='primary'>机构注册</AtButton>
      </View>

    )
  }
}
