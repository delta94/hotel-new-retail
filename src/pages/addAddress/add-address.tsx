import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { AtButton, AtInput, AtTextarea, AtSwitch } from 'taro-ui'
import { getWeixinAddress } from '@/utils/auth'
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
    phone: '',
    address: '',
    city: [],
    detail: ''
  }
  handleChange () {

  }
  handleChangeArae () {

  }
  sumbit () {
    
  }
  async weixinClick () {
    let res = await getWeixinAddress()
    console.log(res)
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)
    
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
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='phone'
            title='手机号码：'
            type='phone'
            placeholder=''
            value={this.state.phone}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='address'
            title='所在地区：'
            type='text'
            placeholder=''
            value={this.state.address}
            onChange={this.handleChange.bind(this)}
          >
            <Picker  mode='region' value={this.state.city}  onChange={this.handleChangeArae.bind(this)}>
              请选择 <View className='icon at-icon at-icon-chevron-down'></View>
            </Picker>
          </AtInput>
          <View className='detail-address'>
            <View className='label'>详细地址：</View>
            <AtTextarea
              count={false}
              height={150}
              value={this.state.detail}
              onChange={this.handleChange.bind(this)}
              maxLength={200}
              placeholder='如道路、门牌号、小区、楼栋号、单元等'
            />
          </View>
        </View>
        <View className='switch'>
          <AtSwitch color="#47cab3" border={false} title='设置默认地址' />
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
