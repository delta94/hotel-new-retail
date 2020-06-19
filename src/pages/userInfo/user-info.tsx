import Taro, { Component, Config} from '@tarojs/taro'
import { View ,Picker} from '@tarojs/components'
import { AtAvatar} from 'taro-ui'

import './user-info.scss'

export default class UserInfo extends Component {

  config: Config = {
    navigationBarTitleText: '个人信息',
  }
  constructor(props){
    super(props)
  }
  state = {
    sexOptions:[
        {
            label:'男',
            value:'0'
        },
        {
            label:'女',
            value:'1'
        }
    ],
    form:{
        name:'',
        mobile_no:'',
        short_name:'',
        emergency_mobile:'',
        sex:{label:'',value:''},
        area:[],
        detail_area:'',
        birthday: ''
    },
    open:false
  }


  handleChange = (key,value)=>{

      console.log(key)
      console.log(value)
      return value
  }

  handleChangeArae = (e)=>{
    console.log(e.detail.value)
  }

  handleClickChildren = (value)=>{
      this.setState({
          open:value
      })
  }

  componentWillMount () { }

  componentDidMount () {
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='user-info'>
        <View className='user-item'>
          <View className='user-item-name'>头像</View>
          <View className='user-item-right'>
            <View className='info'>
              <AtAvatar
                image='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
                size='small'
                >
              </AtAvatar>
            </View>
            <View className='icon at-icon at-icon-chevron-right'></View>
          </View>
        </View>
        <View className='user-item'>
          <View className='user-item-name'>手机号码</View>
          <View className='user-item-right'>
            <View className='info'>未绑定</View>
            <View className='icon at-icon at-icon-chevron-right'></View>
          </View>
        </View>
        <Picker  mode='region' value={this.state.form.area}  onChange={this.handleChangeArae.bind(this)}>
            <View className='user-item'>
              <View className='user-item-name'>地区</View>
              <View className='user-item-right'>
                <View className='info'>请选择</View>
                <View className='icon at-icon at-icon-chevron-right'></View>
              </View>
            </View>
        </Picker>
        <Picker rangeKey='label' mode='selector' value={0} range={this.state.sexOptions}
          onChange={this.handleChange.bind(this,'sex')} >
            <View className='user-item'>
              <View className='user-item-name'>性别</View>
              <View className='user-item-right'>
                <View className='info'>女</View>
                <View className='icon at-icon at-icon-chevron-right'></View>
              </View>
            </View>
        </Picker>
        <Picker  mode='date' value={this.state.form.birthday}  onChange={this.handleChangeArae.bind(this)}>
            <View className='user-item'>
              <View className='user-item-name'>生日</View>
              <View className='user-item-right'>
                <View className='info'>请填写</View>
                <View className='icon at-icon at-icon-chevron-right'></View>
              </View>
            </View>
        </Picker>
        <View className='user-item'>
          <View className='user-item-name'>设置</View>
          <View className='user-item-right'>
            <View className='icon at-icon at-icon-chevron-right'></View>
          </View>
        </View>
      </View>
    )
  }
}
