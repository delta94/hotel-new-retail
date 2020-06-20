import Taro, { Component, Config} from '@tarojs/taro'
import { View ,Picker} from '@tarojs/components'
import { AtAvatar, AtActionSheet, AtActionSheetItem, AtButton} from 'taro-ui'
import { getUserInfo } from '@/utils/auth'
import './user-info.scss'

const sexOptions = [
  {
      label:'男',
      value: 0
  },
  {
      label:'女',
      value: 1
  }
]
export default class UserInfo extends Component {

  config: Config = {
    navigationBarTitleText: '个人信息',
  }
  constructor(props){
    super(props)
  }
  state = {
    area:[],
    gender: 0,
    birthday: '',
    isOpenAvatar:false
  }
  toggleAvatar (flag) {
    this.setState({
      isOpenAvatar: flag
    })
  }
  openSetting () {
    Taro.openSetting({
      'success':(res)=>{
        console.log(res)
      },
      'fail':(res)=>{
        console.log(res)
      }
    })
  }
  getAvatar () {
    getUserInfo()
  }
  handleChange (key,value) {
    this.setState({
      [key]: value.detail.value
    })
    return value
  }

  bindPhoneNumber () {
    Taro.navigateTo({
      url: '/pages/bindPhoneNumber/bind-phone-number'
    })
  }
  componentWillMount () { }

  componentDidMount () {
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { isOpenAvatar, birthday, gender, area } = this.state
    const areaName = area.join('  ')
    return (
      <View className='user-info'>
        <View className='user-item' onClick={this.toggleAvatar.bind(this, true)}>
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
        <View className='user-item' onClick={this.bindPhoneNumber.bind(this)}>
          <View className='user-item-name'>手机号码</View>
          <View className='user-item-right'>
            <View className='info'>未绑定</View>
            <View className='icon at-icon at-icon-chevron-right'></View>
          </View>
        </View>
        <Picker  mode='region' value={area}  onChange={this.handleChange.bind(this, 'area')}>
            <View className='user-item'>
              <View className='user-item-name'>地区</View>
              <View className='user-item-right'>
                <View className='info'>{ areaName || '请选择' }</View>
                <View className='icon at-icon at-icon-chevron-right'></View>
              </View>
            </View>
        </Picker>
        <Picker rangeKey='label' mode='selector' value={gender} range={sexOptions}
          onChange={this.handleChange.bind(this,'gender')} >
            <View className='user-item'>
              <View className='user-item-name'>性别</View>
              <View className='user-item-right'>
                <View className='info'>{ gender == 1 ? '女' : '男'}</View>
                <View className='icon at-icon at-icon-chevron-right'></View>
              </View>
            </View>
        </Picker>
        <Picker  mode='date' value={birthday}  onChange={this.handleChange.bind(this, 'birthday')}>
            <View className='user-item'>
              <View className='user-item-name'>生日</View>
              <View className='user-item-right'>
                <View className='info'>{birthday || '请填写'}</View>
                <View className='icon at-icon at-icon-chevron-right'></View>
              </View>
            </View>
        </Picker>
        <View className='user-item' onClick={this.openSetting.bind(this)}>
          <View className='user-item-name'>设置</View>
          <View className='user-item-right'>
            <View className='icon at-icon at-icon-chevron-right'></View>
          </View>
        </View>

        <AtActionSheet isOpened={isOpenAvatar} cancelText='取消' onClose={this.toggleAvatar.bind(this, false)}>
          <AtActionSheetItem>
            <AtButton className='button-sheet' onClick={this.getAvatar.bind(this)}>使用微信头像</AtButton>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
