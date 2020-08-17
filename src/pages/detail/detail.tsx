import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtActionSheet, AtActionSheetItem,AtInputNumber } from 'taro-ui'
import './detail.scss'
import { accMul, accDiv } from '@/utils/index'
import { getProductInfoById, getProductImageById, getProductRichText, getSkuItemByProductId, addShopCar } from '@/servers/servers.js'
import { getStorageSync } from '@/utils/auth'
// import PeopleWatch from '@/components/peopleWatch/people-watch'
import FooterCarBuy from '@/components/footCarBuy/foot-car-buy'
import SwiperList from '@/components/swiper/swiper';
let id = ''
let skuItem = []
let skuSheetType = 'buy'
export default class detail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '商品详情',
    // navigationBarBackgroundColor:'#47cab3',
    navigationBarTextStyle: 'black',
    "usingComponents": {
      "wxparser": "plugin://wxparserPlugin/wxparser"
    }
  }

  static options = {
    addGlobalClass: true
  }

  state = {
    list: [],
    data: {},
    isCourseOpend: false,
    amount:1,
    skuList: [],
    skuData: {},
    richText: ''
  }


  componentWillMount() {
    id = this.$router.params.id
    getProductImageById({
      productId: id
    }).then(res => {
      res.code === 200 && this.setState({
        list: res.data
      })
    })
    getProductInfoById({
      id
    }).then(res => {
      res.code === 200 && this.setState({
        data: res.data
      })
    })
    getProductRichText({
      productId: id
    }).then(res => {
      res.code === 200 && this.setState({
        richText: res.data.detailInfo
      })
    })
  }
  componentDidMount () {
  }
  //设置分享页面的信息
  onShareAppMessage(res) {
    console.log(res)
    return {
      title: '这个商品真不错，快来围观吧！',
      path: `/pages/detail/detail?id=${this.$router.params.id}`
    }
  }

  slideChange = ()=> {
  }
  openChoiceCourse() {
    let skuList:Array<any> = []
    getSkuItemByProductId({
      productId: id
    }).then(res=> {
      if (res.code === 200 && res.data[0]) {
        let skuInfo = JSON.parse(res.data[0].skuInfo)
        Object.keys(skuInfo).forEach(name => {
          let list:Array<any> = []
          list.push(skuInfo[name])
          skuList.push({
            name: name,
            list: list,
            choiceSku: list[0]
          })
        })
        this.setState({
          skuData: res.data[0]
        })
        skuItem = res.data.map(item => {
          let skuInfo = item.skuInfo = JSON.parse(item.skuInfo)
          Object.keys(skuInfo).forEach(name => {
           let skuobj = skuList.find(n => n.name === name)
           if (!skuobj.list.includes(skuInfo[name])) {
            skuobj.list.push(skuInfo[name])
           }
          })
          return item
        })
        this.setState({
          skuList
        })
      }
    })
    this.setState({
      isCourseOpend: true
    })
  }
  showSkuSheet (type) {
    skuSheetType = type
    this.openChoiceCourse()
  }
  async addCar () {
    const { amount, skuData } = this.state
    let res = await addShopCar({
      amount,
      productId: skuData['productId'],
      productSkuItemId: skuData['id'],
      userId: await getStorageSync('userId')
    })
    if (res.code === 200) {
      Taro.showToast({
        title: '已添加到购物车',
        icon: 'success',
        duration: 2000,
        complete: ()=>{
          this.closeChoiceCourse()
        }
      })
      this.refs.carBuy.getUserShopList()
    }
  }
  confirm () {
    if (skuSheetType === 'car') {
      this.addCar()
    } else {
      const {amount, skuData } = this.state
      Taro.navigateTo({
        url: `/pages/orderConfirm/order-confirm?productId=${skuData['productId']}&skuId=${skuData['id']}&amount=${amount}`
      })
    }
  }
  closeChoiceCourse() {
    this.setState({
      isCourseOpend: false
    })
  }
  choiceCouseChange(item,pidx,it, index) {
    item['choiceSku'] = it
    let { skuList } = this.state
    this.setState({
      skuList: skuList.map((t,i) => pidx === i ? item:t)
    },()=>{
      let choiceSkuInfo = {}
      this.state.skuList.map(sk => {
        choiceSkuInfo[sk['name']] = sk['choiceSku']
      })
      skuItem.forEach(item => {
        let flag = Object.keys(item['skuInfo']).every(key=>{
          return item['skuInfo'][key] === choiceSkuInfo[key]
        })
        flag && this.setState({
          skuData: item
        })
      })
    })
  }
  handleChange (value) {
    this.setState({
      amount: value
    })
  }
  render() {
    const { list,  data, isCourseOpend, skuList, amount, skuData, richText } = this.state
    const choiceSkuShow = skuList.map(item => `"${item['choiceSku']}"`).join('')
    const skuItem = skuList.map((item, pidx) => {
      const st :Array<any> = item['list'] || []
      const courseAttr = st.map((it, index) => {
        return <View key='it' onClick={this.choiceCouseChange.bind(this, item,pidx,it, index )} className={`attr-list-item ${item['choiceSku'] === it ? 'active' : ''}`}>{it}</View>
      })
      return <AtActionSheetItem key='name'>
              <View className='attr'>
                <View className='attr-text'>{item['name']}</View>
                <View className='attr-list'>
                  {courseAttr}
                </View>
              </View>
            </AtActionSheetItem>
    })
    return (
      <View className='detail'>
        <View className='swiper'>
          <SwiperList list={list} change={this.slideChange} />
        </View>
        {/* 商品描述 */}
        <View className='detail'>
          <View className='desc-sale'>
            <View className='desc'>酒店同款 {data['productName']}</View>
            <View className='icon'>
              <View className='icon-item icon-share'>
                <AtButton className='button-share' openType='share'></AtButton>
                <View className='at-icon at-icon-share-2'></View>
              </View>
            </View>
          </View>
          <View className='price'>¥{accDiv(data['salePrice'], 100)}</View>
          <View className='profile'>{data['productProfile']}</View>
          <View className='transport-price'>运费 免运费</View>
          <View className='other-info'><View className='at-icon icon at-icon-alert-circle'></View> 成分和保养</View>
          <View className='other-info'><View className='at-icon icon at-icon-alert-circle'></View> 配送和退货须知</View>
        </View>
        <View className='block-line'></View>
        {/* 选择尺寸款式 */}
        <View className='list'>
          <AtList hasBorder={false}>
            <AtListItem title='选择 款式 尺寸' arrow='right' onClick={this.openChoiceCourse.bind(this)} />
          </AtList>
        </View>
        <View className='block-line'></View>
        <View className='rich-text'>
          <wxparser  rich-text={richText} image-preview={false} />
        </View>
        {/* <PeopleWatch /> 相关推荐第一期不做 */}
        <FooterCarBuy ref='carBuy' contcat-btn='contcat-btn' showSkuSheet={this.showSkuSheet.bind(this)} />
        {/* 选课面板 */}
        <AtActionSheet isOpened={isCourseOpend} onClose={this.closeChoiceCourse.bind(this)}>
          <AtActionSheetItem className='sheet-item-content'>
            <View className='sheet'>
              <View className='price'>
                <View>
                  <Image className='vect' mode='widthFix' src={data['mainPictureUrl']}></Image>
                </View>
                <View className='price_tip'>
                  <View className='total-price'>价格：¥{accDiv(accMul(amount, skuData['salePrice']), 100)}</View>
                  <View className='tip'>库存：{skuData['stockAmount']}件</View>
                  <View className='tip'>已选：{choiceSkuShow}</View>
                </View>
              </View>
            </View>
          </AtActionSheetItem>
          {skuItem}
          <AtActionSheetItem>
            <View className='attr'>
              <View className='attr-text'>购买数量</View>
              <AtInputNumber
                type='number'
                min={1}
                max={skuData['stockAmount']}
                step={1}
                value={amount}
                onChange={this.handleChange.bind(this)}
              />
            </View>
          </AtActionSheetItem>
          <AtActionSheetItem className='sheet-item-btn'>
            <AtButton onClick={this.confirm.bind(this)} type='primary'>确定</AtButton>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
