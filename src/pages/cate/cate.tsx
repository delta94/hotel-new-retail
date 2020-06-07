import Taro, { Component, Config } from '@tarojs/taro'
import { View,ScrollView,Image } from '@tarojs/components'
import { AtButton, AtSearchBar, AtInput } from 'taro-ui'
import { getCategoryParentList, getCategoryChildren } from '@/servers/servers.js'
import './cate.scss'

export default class Cate extends Component {


  config: Config = {
    navigationBarTitleText: '分类',
  }
  state = {
    cateList: [],
    cateChildList: [],
    activeIndex: 1,
    mainImageUrl: ''
  }
  async getParentList () {
    let res = await getCategoryParentList()
    if (res.code === 200) {
      this.setState({
        cateList: res.data || []
      })
      this.clickItem(res.data[0])
    } 
  }
  async getCategoryChildren (parentId) {
    let res = await getCategoryChildren({parentId})
    res.code === 200 && this.setState({
      cateChildList: res.data || []
    })
  }
  componentWillMount() { 
    this.getParentList()
  }
  componentDidMount() {
  }

  clickSearch(){
    //点击搜索框跳转到搜索页面
    Taro.navigateTo({
      url:'/pages/search/search'
    })
  }
  clickItem(item){
    this.setState({
      activeIndex: item.id,
      mainImageUrl: item.imageUrl
    })
    this.getCategoryChildren(item.id)
  }
  clickCate(item){
    Taro.navigateTo({
      url:`/pages/cateDetail/cate-detail?id=${this.state.activeIndex}&childId=${item.id}`
    })
  }
  render() {
    const {cateList,activeIndex, mainImageUrl, cateChildList} = this.state
    const listItem = cateList.map(item=>{
          return <View className={`list-item ${activeIndex===item['id']?'actived':''}`} key='id' onClick={this.clickItem.bind(this,item)}>{item['name']}</View>
    })
    const childItem = cateChildList.map(item => {
      return <View className='cate-child-item' key='id' onClick={this.clickCate.bind(this, item)}>
        <Image style='width:100%;' mode='widthFix' src={item['imageUrl']}></Image>
        <View>{item['name']}</View>
      </View>
    })
    return (
      <View className='cate'>
        <View className='search at-row at-row__align--center at-row__justify--center' onClick={this.clickSearch.bind(this)}>
          <View className='at-icon at-icon-search search-icon'></View>
          <View className='search-text'>搜索商品</View>
        </View>

        <View className='cate-container'>
          <ScrollView scrollY className="list-container">
            {listItem}
          </ScrollView>
          <View className='content-container'>
            <View className='main-image'>
              <Image style='width:100%;' mode='widthFix' src={mainImageUrl}></Image>
              <View className='mask'>全部</View>
            </View>
            <View className='cate-child'>
              {childItem}
            </View>
          </View>
        </View>

      </View>

    )
  }
}
