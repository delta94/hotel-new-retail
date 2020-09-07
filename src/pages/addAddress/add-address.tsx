import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { AtButton, AtInput, AtTextarea, AtSwitch } from 'taro-ui'
import { getWeixinAddress } from '@/utils/auth'
import { saveUserAddress, getAddressDetailById, editUserAddress } from '@/servers/servers.js'
import './add-address.scss'
export default class AddAddress extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '新增地址',
  }

  state = {
    name: '',
    mobileNo: '',
    address: '',
    province:'',
    city: '',
    town: '',
    zipCode: '',
    areaPick: [],
    detailAddress: '',
    isDefault: false,
    id: ''
  }
  handleChange (prop, value) {
    if (prop === 'address') {
      this.setState({
        [prop]: ''
      })
      return ''
    }
    this.setState({
      [prop]: value
    })
    return value
  }
  handleChangeArae (e) {
    this.setState({
      province: e.detail.value[0],
      city: e.detail.value[1],
      town: e.detail.value[2],
      zipCode: e.detail.postcode,
      address: e.detail.value[0] + ' '+ e.detail.value[1] + ' ' + e.detail.value[2]
    })
  }
  async sumbit () {
    let res = ''
    const data = {...this.state}
    if (this.state.id) {
      res = await editUserAddress(data)
    } else {
      res = await saveUserAddress(data)
    }
    res['code'] === 200 && Taro.navigateBack()
  }
  async weixinClick () {
    let res = await getWeixinAddress()
    if (res) {
      this.setState({
        name: res.userName,
        mobileNo: res.telNumber,
        address: res.provinceName + ' ' + res.cityName + ' ' + res.countyName,
        province: res.provinceName,
        city: res.cityName,
        town: res.countyName,
        zipCode: res.postalCode,
        detailAddress: res.detailInfo,
        isDefault: false
      })
    }
  }
  async getAddressDetailById (id) {
    const res = await getAddressDetailById({
      id
    })
    if (res.code === 200){
      const data = res.data
      Object.keys(data).forEach(key => {
        this.setState({
          [key] : data[key]
        })
      })
      this.setState({
        address: data.province + ' ' + data.city + ' ' + data.town
      })
    }
  }
  componentWillMount () {
    let id = this.$router.params.id
    if (id) {
      Taro.setNavigationBarTitle({
        title: '编辑地址'
      })
      this.setState({
        id
      })
      this.getAddressDetailById(id)
    }
  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    return (
      <View className='add-address'>
        <View className='info'>
          <AtInput
            name='name'
            title='收货人：'
            type='text'
            placeholder=''
            value={this.state.name}
            onChange={this.handleChange.bind(this, 'name')}
          />
          <AtInput
            name='mobileNo'
            title='手机号码：'
            type='phone'
            placeholder=''
            value={this.state.mobileNo}
            onChange={this.handleChange.bind(this, 'mobileNo')}
          />
          <AtInput
            name='address'
            title='所在地区：'
            type='text'
            placeholder=''
            value={this.state.address}
            onChange={this.handleChange.bind(this, 'address')}
          >
            <Picker  mode='region' value={this.state.areaPick}  onChange={this.handleChangeArae.bind(this)}>
              请选择 <View className='icon at-icon at-icon-chevron-down'></View>
            </Picker>
          </AtInput>
          <View className='detail-address'>
            <View className='label'>详细地址：</View>
            <AtTextarea
              count={false}
              height={150}
              value={this.state.detailAddress}
              onChange={this.handleChange.bind(this, 'detailAddress')}
              maxLength={200}
              placeholder='如道路、门牌号、小区、楼栋号、单元等'
            />
          </View>
        </View>
        <View className='switch'>
          <AtSwitch color="#47cab3" checked={this.state.isDefault} onChange={this.handleChange.bind(this, 'isDefault')} border={false} title='设置默认地址' />
        </View>
        <View className='weixin-addre' onClick={this.weixinClick.bind(this)}>
          <Text className='icon'>+</Text>
          <Text>微信地址导入</Text>
        </View>
        <View className='footer fixed fixed-b'>
          <AtButton onClick={this.sumbit.bind(this)} type='primary'>提交</AtButton>
        </View>
      </View>
    )
  }
}
