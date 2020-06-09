import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,ScrollView} from '@tarojs/components'
import { AtDrawer} from 'taro-ui'
import { getCategoryParentList, getCategoryChildren } from '@/servers/servers.js'
import './cate-detail.scss'

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
    scrollIntoViewId: '',
    showCateList: false,
    showPick: false
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
  toggleCate () {
    const { showCateList } = this.state
    this.setState({
      showCateList: !showCateList
    })
  }
  togglePick () {
    const { showPick } = this.state
    this.setState({
      showPick: !showPick
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
    const { cateList, cateChildList, currentId, currentChildId, currentName, scrollIntoViewId, showCateList, showPick } = this.state
    const cateItem = cateList.map(item => {
      return <View onClick={this.clickCate.bind(this, item)} className={`cate-item ${currentId === item['id'] ? 'actived' : ''}`}>
        <View className='cate-name'>{item['name']}</View>
        { currentId === item['id'] ? <View className='icon at-icon at-icon-check'></View> : ''}
      </View>
    })
    const childItem = cateChildList.map(item => {
      return <View key='id' id={`childId${item['id']}`} onClick={this.clickChild.bind(this, item)} className={`child-item ${currentChildId===(item['id'])?'actived':''}`}>{item['name']}</View>
    })
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
        <AtDrawer className='drawer' show={showPick} mask right onClose={this.togglePick.bind(this)}>
          <View className='drawer-item drawer-item-header'>
            <View className='pick-text'>+筛选</View>
            <View className='close-text'>关闭</View>
          </View>
          <View className='drawer-item'>价格从低到高</View>
          <View className='drawer-item'>价格从高到低</View>
          <View className='drawer-item'>人气排名</View>
          <View className='drawer-item'>上新时间</View>
        </AtDrawer>
      </View>
    )
  }
}
