import Taro, { Component, Config} from '@tarojs/taro'
import { View ,Picker} from '@tarojs/components'
import { AtAvatar, AtActionSheet, AtActionSheetItem, AtButton} from 'taro-ui'
import { getUserInfo, getStorageSync, setStorageSync } from '@/utils/auth'
import { getUserInfoByParam, editUserInfo } from '@/servers/servers.js'
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
    gender: 2,
    province: '',
    city: '',
    mobileNo: '',
    birthday: '',
    isOpenAvatar:false,
    userData: {},
    headImage: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
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
  async getAvatar () {
    const user = await getUserInfo()
    this.setState({
      headImage: user.headImageUrl
    })
    this.toggleAvatar(false)
    setStorageSync('headImage', user.headImageUrl)
  }
  async saveUserInfo (p) {
    const { userData } = this.state
    editUserInfo({
      ...userData,
      userId: await getStorageSync('userId'),
      ...p
    })
  }
  handleChange (key,value) {
    this.setState({
      [key]: value.detail.value
    })
    if (key === 'area') {
      this.setState({
        province: value.detail.value[0],
        city: value.detail.value[1]
      })
      this.saveUserInfo({
        province: value.detail.value[0],
        city: value.detail.value[1]
      })
    } else {
      this.saveUserInfo({
        [key]: value.detail.value
      })
    }
    return value
  }

  bindPhoneNumber () {
    Taro.navigateTo({
      url: '/pages/bindPhoneNumber/bind-phone-number'
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
  async getPersonalInfo(){
    const user = await getUserInfoByParam({
      userId: await getStorageSync('userId')
    })
    if (user.code === 200) {
      const data = user.data
      this.setState({
        userData: data,
        gender: data.gender,
        province: data.province,
        city: data.city,
        mobileNo: data.mobileNo,
        birthday: data.birthday,
      })
    }
  }
  async componentWillMount () {
    this.getHeadImage()
    this.getPersonalInfo()
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { isOpenAvatar, birthday, gender, area, headImage, mobileNo, province, city } = this.state
    const areaName = province ? `${province}  ${city}` : ''
    return (
      <View className='user-info'>
        <View className='user-item' onClick={this.toggleAvatar.bind(this, true)}>
          <View className='user-item-name'>头像</View>
          <View className='user-item-right'>
            <View className='info'>
              <AtAvatar
                image={headImage}
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
            <View className='info'>{ mobileNo || '未绑定'}</View>
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
