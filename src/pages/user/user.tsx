import Taro, { Component, Config } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import { AtButton,AtMessage,AtInputNumber } from 'taro-ui'
import './user.scss'
import Count from '../../components/count/count'

import {CounterContext} from '../../components/createContext/counter-context'

interface todo {
  text:string,
  name?:string,
  age?:number
}

export default class User extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '个人中心',
  }
  // readOnly: string;
  constructor(props){
    super(props)
    // this.readOnly = 'test'
  }
  state = {
    count:1
  }
  list:todo[] = [
    {
      text:'睡觉'

    }
  ]
  zjClick=()=>{
    // Taro.atMessage({
    //   message:'爱你哟！',
    //   type:'success'
    // })
    Taro.openSetting({
      'success':(res)=>{
        console.log(res)
      },
      'fail':(res)=>{
        console.log(res)
      }
    })
    // Taro.getUserInfo({
    //   success:(res) =>{
    //     console.log(res)
    //   }
    // })
  }
  getSetting = ()=>{
    Taro.getSetting({
      success (res) {
        console.log(res.authSetting)
      }
    })
  }
  getUserInfo = (res)=>{
    console.log(res)
  }
  getPhoneNumber = (res)=>{
    console.log(res)
  }
  login = ()=>{
    Taro.login({
      success:(res)=>{
        console.log(res)
      }
    })
  }
  checkSession = ()=>{
    Taro.checkSession({
      success:(res)=>{
        console.log(res)
      }
    })
  }
  chooseAddress = ()=>{
    Taro.chooseAddress({
      success:(res)=>{
        console.log(res)
      },
      fail:(e)=>{
        console.log(e)
        this.zjClick()
      }
    })
  }
  requestPayment = ()=>{
    Taro.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success (res) {
        console.log(res)
      },
      fail (res) {
        console.log(res)
       }
    })
  }
  handleChange = async (value)=> {
    this.setState({
      count:value
    },()=>{
      console.log(this.state)
    })
  }
  componentWillMount () { }

  componentDidMount () {
    // console.log(Taro)
    // console.log(this.conut)
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='user'>
        <AtMessage />
        <AtButton onClick={this.zjClick} type='primary'>openSetting</AtButton>
        <AtButton onClick={this.login} type='primary'>login</AtButton>
        <AtButton onClick={this.checkSession} type='primary'>checkSession</AtButton>
        <AtButton onClick={this.getSetting} type='primary'>getSetting</AtButton>
        <AtButton onClick={this.chooseAddress} type='primary'>chooseAddress</AtButton>
        <AtButton onClick={this.requestPayment} type='primary'>requestPayment</AtButton>
        <AtButton type='primary' openType='getUserInfo' onGetUserInfo={this.getUserInfo}>getUserInfo</AtButton>
        <AtButton type='primary' openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber}>getPhoneNumber</AtButton>
        <CounterContext.Provider value={this.state.count}>
          <Count />
        </CounterContext.Provider>
        <AtInputNumber
          type='number'
          min={0}
          max={10}
          step={1}
          value={this.state.count}
          onChange={this.handleChange}
        />
        <View>
          <Text>{this.state.count}</Text>
        </View>
        <View className='iconfont iconuser'></View>
      </View>
    )
  }
}
