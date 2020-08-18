import Taro, { Component, Config } from '@tarojs/taro'
import { View,Text, Image, Radio, RadioGroup } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import { accMul, accDiv } from '@/utils/index'
import { getUserShopCarList, getProductInfoById, getSkuItemByProductId, deleteShopCar } from '@/servers/servers.js'
import { checkSessionLogin } from '@/utils/auth'
import './buy-car.scss'
let cacheProductData: Array<any>  = []
let cacheSkuList: Array<any> = []
let choiceIndex:any = ''
export default class BuyCar extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '购物车',
  }

  state = {
    carDataList: []
  }
  async getProductInfoById (productId) {
    let data = cacheProductData.find(item => item['id'] === productId)
    return new Promise(async r => {
      if (data) {
        r(data)
      } else {
        let res = await getProductInfoById({id: productId})
        res.code === 200 && cacheProductData.push(res.data) && r(res.data)
      }
    })
  }
  getSkuItemByProductId (productId) {
    let data = cacheSkuList.find(item => item['id'] === productId)
    return new Promise(async r => {
      if (data) {
        r(data.list)
      } else {
        let res = await getSkuItemByProductId({productId: productId})
        res.code === 200 && cacheSkuList.push({
          id: productId,
          list: res.data
        }) && r(res.data)
      }
    })
  }
  async handleCarData (data = []) {
    let carDataList: Array<any> = []
    for (let val of data) {
      const [productDetail, skuList]:Array<any> = await Promise.all([this.getProductInfoById(val['productId']), this.getSkuItemByProductId(val['productId'])])
      let skuInfoData = skuList.find(item => item['id'] === val['productSkuItemId'])
      skuInfoData.mainPictureUrl = productDetail.mainPictureUrl
      skuInfoData.productName = productDetail.productName
      skuInfoData.productProfile = productDetail.productProfile
      skuInfoData.skuInfo = typeof skuInfoData.skuInfo === 'string' ? JSON.parse(skuInfoData.skuInfo) : skuInfoData.skuInfo
      skuInfoData.amount = val['amount']
      skuInfoData.checked = false
      carDataList.push(skuInfoData)
    }
    this.setState({
      carDataList
    })
  }
  async getCarList () {
    const res = await getUserShopCarList({
      pageNo: 1,
      pageSize: 10
    })
    res.code === 200 && res.data && res.data.records && this.handleCarData(res.data.records)
  }
  handleChange (item,index, value) {
    item.amount = value
    const carDataList = this.state.carDataList.map((it, idx) => idx===index ? item:it)
    this.setState({
      carDataList
    })
  }
  clickBuy () {
    const choiceData = this.state.carDataList[choiceIndex]
    if (!choiceData) {
      return Taro.showToast({
        title: '请选择需要购买的商品',
        icon: 'none',
        duration: 2000
      })
    }
    Taro.navigateTo({
      url: `/pages/orderConfirm/order-confirm?productId=${choiceData['productId']}&skuId=${choiceData['id']}&amount=${choiceData['amount']}`
    })
  }
  changeRadio (e) {
    const index = +e.detail.value
    choiceIndex = index
  }
  async deleteShopCar (item, e) {
    if (e.confirm) {
      let res = await deleteShopCar()
      res.code === 200 && Taro.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
    }
  }
  deleteBuyCar (item) {
    Taro.showModal({
      title: '提示',
      content: '确认将该商品删除吗',
      success: this.deleteShopCar.bind(this, item)
    })
  }
  componentWillMount () {
    checkSessionLogin()
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getCarList()
   }

  componentDidHide () { }

  render () {
    const { carDataList } = this.state
    const buyCarItem = carDataList.map((item, index) => {
      const sku = Object.values(item['skuInfo']).join('-')
      return <View className='buy-car-item' key='id'>
          <View className='buy-car-item-left'>
            <Radio color='#47cab3' value={`${index}`} checked={item['checked']}></Radio>
          </View>
          <View className='buy-car-item-right'>
            <Image className='vect' mode='widthFix' src={item['mainPictureUrl']}></Image>
            <View className='buy-car-item-right__content'>
              <View>
                <View className='product-name'>
                  <Text>{item['productName']}</Text>
                  <Text onClick={this.deleteBuyCar.bind(this, item)} className='at-icon icon at-icon-close'></Text>
                </View>
                <View className='sku'>{sku}</View>
              </View>
              <View className='product-number'>
                <AtInputNumber
                  type='number'
                  min={1}
                  max={item['stockAmount']}
                  step={1}
                  value={item['amount']}
                  onChange={this.handleChange.bind(this, item, index)}
                />
                <View className='price'>¥{accDiv(accMul(item['amount'], item['salePrice']), 100)}</View>
              </View>
            </View>
          </View>
      </View>
    })
    return (
      <View className='buy-car'>
        <View className='profile'>全场订单包邮 | 七天无忧退换货</View>
        <View className='buy-car-data'>
          <RadioGroup onChange={this.changeRadio.bind(this)}>
            {buyCarItem}
          </RadioGroup>
        </View>
        <View className='buy-car-footer fixed fixed-b'>
          <Text className='heji'>合计</Text>
          <Text className='total-price'>¥345</Text>
          <View className='line'></View>
          <View onClick={this.clickBuy.bind(this)} className='buy-btn'>立即购买</View>
        </View>
        {carDataList.length === 0 &&<View className='no-data'>
          <View className='at-icon icon at-icon-shopping-cart'></View>
          <View className='no-data-text'>您的购物车是空的</View>
        </View>}
      </View>
    )
  }
}
