import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image, Text } from '@tarojs/components'
import { AtInputNumber, AtInput } from 'taro-ui'
import { accDiv, accMul } from '@/utils/index'
import {  getStorageSync } from '@/utils/auth'
import { getProductInfoById, getSkuItemByProductId, getAddressDetailById } from '@/servers/servers.js'
import './order-confirm.scss'

export default class OrderConfirm extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '确认订单',
  }

  state = {
    data: {},
    addressData: '',
    remark: ''
  }

  async getProductInfoById (productId) {
    let res =  await getProductInfoById({id: productId})
    return res.code === 200 ? res.data: {}
  }
  async getSkuItemByProductId (productId) {
    let res =  await getSkuItemByProductId({productId: productId})
    return res.code === 200 ? res.data: []
  }
  async init (params) {
    const [productDetail, skuList]:Array<any> = await Promise.all([this.getProductInfoById(params['productId']), this.getSkuItemByProductId(params['productId'])])
    let skuInfoData = skuList.find(item => item['id'] === params['skuId'])
    skuInfoData.mainPictureUrl = productDetail.mainPictureUrl
    skuInfoData.productName = productDetail.productName
    skuInfoData.productProfile = productDetail.productProfile
    skuInfoData.skuInfo = typeof skuInfoData.skuInfo === 'string' ? JSON.parse(skuInfoData.skuInfo) : skuInfoData.skuInfo
    skuInfoData.amount = params['amount']
    this.setState({
      data: skuInfoData
    })
  }
  handleChange (value) {
    this.setState({
      remark: value
    })
    return value
  }
  handleChangeAmount (amount) {
    const { data } = this.state
    data['amount'] = amount
    this.setState({
      data
    })
  }
  choiceAddress () {
    Taro.navigateTo({
      url: `/pages/myAddress/my-address?type=choice`
    })
  }
  componentWillMount () {
    this.init(this.$router.params)
  }

  componentDidMount () {}

  componentWillUnmount () { }

  async getAddress () {
    const id = await getStorageSync('lastAddressId')
    if(id) {
      const res = await getAddressDetailById({id})
      res.code === 200 && this.setState({
        addressData: res.data
      })
    }
  }
  async componentDidShow () {
    this.getAddress()
  }

  componentDidHide () { }

  render () {
    const { data, addressData } = this.state
    const sku = Object.values(data['skuInfo'] || {}).join(',')
    return (
      <View className='order-confirm'>

        <View className='order-address'>
          <View className='address-title'>收货地址</View>
          <View className='address-content' onClick={this.choiceAddress.bind(this)}>
            <View className='address-content-left'>
              {!addressData && <View>前往填写收货人，联系号码和地址</View>}
              {addressData && <View className='address-detail'>
                <View><Text className='name'>{addressData['name']}</Text> <Text className='tel'>{addressData['mobileNo']}</Text></View>
                <View className='address'>{`${addressData['province']}${addressData['city']}${addressData['town']}${addressData['detailAddress']}`}</View>
              </View>}
            </View>
            <View className='at-icon icon at-icon-chevron-right'></View>
          </View>
        </View>

        <View className='order-detail'>
          <Image className='vect' mode='widthFix' src={data['mainPictureUrl']}></Image>
          <View className='order-detail-right'>
            <View className='name'>{data['productName']}</View>
            <View className='sku'>{sku}</View>
            <View className='price'>¥{accDiv(data['salePrice'], 100)}</View>
          </View>
        </View>

        <View className='order-other'>
          <View className='order-other-item'>
            <View className='title'>购买数量:</View>
            <AtInputNumber
                type='number'
                min={1}
                max={data['stockAmount']}
                step={1}
                value={data['amount']}
                onChange={this.handleChangeAmount.bind(this)}
              />
          </View>
          <View className='order-other-item'>
            <View className='title'>配送方式:</View>
            <View>快递 免运费</View>
          </View>
          <View className='order-other-item'>
            <View className='title'>留言:</View>
            <View className='item-right'>
               <AtInput
                name='remark'
                border={false}
                title=''
                type='text'
                placeholderClass = 'placeholderClass'
                placeholder='您的每一个要求，我们都会尽力满足。'
                value={this.state.remark}
                onChange={this.handleChange.bind(this)} />
            </View>
          </View>
        </View>

        <View className='pay-footer fixed fixed-b'>
          <View className='pay-price'>总共：¥{accMul(accDiv(data['salePrice'], 100), data['amount'])}</View>
          <View className='pay-btn'>提交订单</View>
        </View>
      </View>
    )
  }
}
