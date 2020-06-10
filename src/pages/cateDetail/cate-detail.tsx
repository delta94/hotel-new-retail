import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,ScrollView} from '@tarojs/components'
import { AtDrawer} from 'taro-ui'
import { getCategoryParentList, getCategoryChildren } from '@/servers/servers.js'
import ProductGrid from '@/components/productGrid/product-grid';
import './cate-detail.scss'

const PICKLIST = [
  {
    id: 'priceLow',
    name: '价格从低到高'
  },
  {
    id: 'priceHight',
    name: '价格从高到低'
  },
  {
    id: 'popularity',
    name: '人气排名'
  },
  {
    id: 'newTime',
    name: '上新时间'
  }
]
let ID = 0
export default class CateDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'NEW RETAIL',
  }

  state = {
    cateList: [],
    cateChildList: [],
    currentName: '',
    currentId: '',
    currentChildId: '',
    currentPickId: '',
    scrollIntoViewId: '',
    showCateList: false,
    showPick: false,
    list: Array.from({length:14}).map(() => {
      return {
        id:ID++,
        mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
        imageUrl:require('../../assets/images/hotel-same1.jpg'),
        productName:'商品',
        salePrice:150
      }
    })
  }
  setCurrentName () {
    const { cateList, currentId } = this.state
    const currentCate = cateList.find(item => currentId === item['id'] ) || {name: ''}
    this.setState({
      currentName: currentCate.name
    })
  }
  setScrollIntoView () {
    this.setState({
      scrollIntoViewId: `childId${this.$router.params.childId}`
    })
  }
  async getParentList () {
    let res = await getCategoryParentList()
    if (res.code === 200) {
      this.setState({
        cateList: res.data || []
      }, this.setCurrentName)
    }
  }
  async getCategoryChildren (parentId) {
    let res = await getCategoryChildren({parentId})
    res.code === 200 && this.setState({
      cateChildList: res.data || []
    }, this.setScrollIntoView)
  }
  search () {
    Taro.navigateTo({
      url:'/pages/search/search'
    })
  }
  clickChild (item) {
    this.setState({
      currentChildId: item.id
    })
  }
  clickCate (item) {
    this.toggleCate()
    this.setState({
      currentId: item.id,
      currentName: item.name
    })
  }
  clickPick (item) {
    this.setState({
      currentPickId: item.id,
    })
  }
  toggleCate () {
    const { showCateList } = this.state
    this.setState({
      showCateList: !showCateList
    })
  }
  togglePick (e) {
    e && e.stopPropagation()
    const { showPick } = this.state
    this.setState({
      showPick: !showPick
    })
  }
  closePick () { // 点击事件始终会冒泡到AtDrawer组件
    this.setState({
      showPick: false
    })
  }
  componentWillMount () {
    console.log(this.$router.params)
    this.setState({
      currentId: +this.$router.params.id,
      currentChildId: +this.$router.params.childId
    })
    this.getParentList()
    this.getCategoryChildren(this.$router.params.id)
  }

  componentDidMount () {
    console.log(DEV)
  }

  componentWillUnmount () {
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { cateList, cateChildList, currentId, currentChildId, currentPickId, currentName, scrollIntoViewId, showCateList, showPick, list } = this.state
    const cateItem = cateList.map(item => {
      return <View key='id' onClick={this.clickCate.bind(this, item)} className={`cate-item ${currentId === item['id'] ? 'actived' : ''}`}>
        <View className='cate-name'>{item['name']}</View>
        { currentId === item['id'] ? <View className='icon at-icon at-icon-check'></View> : ''}
      </View>
    })
    const childItem = cateChildList.map(item => {
      return <View key='id' id={`childId${item['id']}`} onClick={this.clickChild.bind(this, item)} className={`child-item ${currentChildId===(item['id'])?'actived':''}`}>{item['name']}</View>
    })
    const drawerItem = PICKLIST.map(item => {
      return <View key='id' className={`drawer-item ${currentPickId === item.id ? 'actived' : ''}`} onClick={this.clickPick.bind(this, item)}>
          <View>{item.name}</View>
          {currentPickId === item.id ?<View className='icon at-icon at-icon-check'></View> : ''}
        </View>
    })
    const length = list.length
    let gridList:Array<any> = []
    let tempList:Array<any> = []
    list.forEach((item, index) => {
      if (index%5 === 0) {
        gridList.push(item)
        tempList = []
      } else {
        tempList.push(item)
        if (tempList.length === 4 || length-1 === index) gridList.push(tempList)
      }
    })
    const listItem = gridList.map(item => {
      return Array.isArray(item) ? <ProductGrid key='id' list={item} /> :
      <View key='id' className='main-product'>
          <View><Image style='width:100%;' mode='widthFix' src={item['imageUrl']}></Image></View>
          <View className='main-product-name'>
            <View>{item['productName']}</View>
            <View>¥{item['salePrice']}</View>
          </View>
      </View>
    })
    console.log(gridList)
    return (
      <View className='cate-detail'>
        <View className='cate-detail-header fixed fixed-t'>
          <View className='header-first'>
            <View onClick={this.toggleCate.bind(this)} className='category-name'>
              <View className='at-icon at-icon-chevron-down'></View>{currentName}
            </View>
            {!showCateList?<View className='category-search' onClick={this.search.bind(this)}>
              <View className='at-icon at-icon-search'></View>
            </View> : ''}
            {showCateList ? <View className='cate-list'>{cateItem}</View> : ''}
          </View>
          <View className='header-sub'>
            <View className='child-name'>
              <ScrollView scrollX scroll-into-view={scrollIntoViewId} className="scrollX">
                {childItem}
              </ScrollView>
            </View>
            <View onClick={this.togglePick.bind(this)} className='pick-name'>+筛选</View>
          </View>
        </View>
        { showCateList ? <View className='mask'></View> : ''}
        <AtDrawer className='drawer' show={showPick} mask right onClose={this.closePick.bind(this)}>
          <View className='drawer-item drawer-item-header'>
            <View className='pick-text'>+筛选</View>
            <View onClick={this.togglePick.bind(this)} className='close-text'>关闭</View>
          </View>
          {drawerItem}
        </AtDrawer>

        {/* 内容区域 */}
        <View className='cate-content'>
          {listItem}
        </View>
      </View>
    )
  }
}
