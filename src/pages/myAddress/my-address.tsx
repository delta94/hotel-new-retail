import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text ,Radio, RadioGroup} from '@tarojs/components'
import { AtButton } from 'taro-ui'
import {  getStorageSync, setStorageSync } from '@/utils/auth'
import { getUserAddressList, deleteUserAddressById } from '@/servers/servers.js'
import './my-address.scss'

export default class MyAddress extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的地址',
  }

  state = {
    addressList: [],
    type: ''
  }

  add () {
    Taro.navigateTo({
      url: '/pages/addAddress/add-address'
    })
  }
  componentWillMount () {
    this.setState({
      type: this.$router.params.type
    })
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  async getUserAddressList () {
    const res = await getUserAddressList({
      userId: await getStorageSync('userId')
    })
    res.code === 200 && this.setState({
      addressList: res.data || []
    })
  }

  async componentDidShow () {
    this.getUserAddressList()
  }
  async changeRadio(e){
    await setStorageSync('lastAddressId', e.detail.value)
    Taro.navigateBack()
  }
  editAddress (item) {
    Taro.navigateTo({
      url: `/pages/addAddress/add-address?id=${item['id']}`
    })
  }
  async deleteUserAddressById(item, e) {
    if (e.confirm) {
      const res = await deleteUserAddressById({
        userReceiveAddressId: item['id']
      })
      res.code === 200 && Taro.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      }) && this.getUserAddressList()
    }
  }
  deleteAddress (item) {
    Taro.showModal({
      title: '提示',
      content: '确认删除该地址吗',
      success: this.deleteUserAddressById.bind(this, item)
    })
  }
  componentDidHide () { }

  render () {
    const { addressList, type } = this.state
    const addressItem = addressList.map(item => {
      return <View className='address-list-item' key='id'>
            {type === 'choice' &&<Radio className='radio' color='#47cab3' value={item['id']} checked={item['checked']}></Radio>}
            <View className='address-detail'>
              <View><Text className='name'>{item['name']}</Text> <Text className='tel'>{item['mobileNo']}</Text></View>
              <View className='address'>{`${item['province']}${item['city']}${item['town']}${item['detailAddress']}`}</View>
            </View>
            <View onClick={this.editAddress.bind(this, item)} className='at-icon icon-edit at-icon-edit'></View>
            <View onClick={this.deleteAddress.bind(this, item)} className='at-icon icon at-icon-trash'></View>
      </View>
    })
    return (
      <View className='my-address'>
        <View className='address-list'>
          <RadioGroup onChange={this.changeRadio.bind(this)}>
            {addressItem}
          </RadioGroup>
        </View>
        <View className='footer fixed fixed-b'>
          <AtButton onClick={this.add.bind(this)} type='primary'>+新增地址</AtButton>
        </View>
      </View>
    )
  }
}
