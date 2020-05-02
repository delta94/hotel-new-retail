import Taro, { Component, Config } from '@tarojs/taro'
import { View,ScrollView,Image } from '@tarojs/components'
import { AtButton, AtSearchBar, AtInput } from 'taro-ui'
import './cate.scss'

export default class Cate extends Component {


  config: Config = {
    navigationBarTitleText: '分类',
  }

  componentWillMount() { }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  state = {
    cateList:[
      {
        id:1,
        name:'酒店同款'
      },
      {
        id:2,
        name:'2020上线'
      },
      {
        id:3,
        name:'床品家纺'
      },
      {
        id:4,
        name:'居家生活'
      },
      {
        id:5,
        name:'个护日用'
      },
      {
        id:6,
        name:'差旅出行'
      }
    ],
    activeIndex:1
  }

  clickSearch(){
    //点击搜索框跳转到搜索页面
    Taro.navigateTo({
      url:'/pages/search/search'
    })
  }
  clickItem(item){
    this.setState({
      activeIndex:item.id
    })
  }

  render() {
    const {cateList,activeIndex} = this.state
    const mainImageUrl = require('@/assets/images/banner2.jpg')
    const listItem = cateList.map(item=>{
          return <View className={`list-item ${activeIndex===item.id?'actived':''}`} key={item.id} onClick={this.clickItem.bind(this,item)}>{item.name}</View>
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
          </View>
        </View>

      </View>

    )
  }
}
