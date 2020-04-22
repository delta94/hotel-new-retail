import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
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

  clickSearch(){
    //点击搜索框跳转到搜索页面
    Taro.navigateTo({
      url:'/pages/search/search'
    })
  }

  render() {
    return (
      <View className='cate'>
        <View className='search at-row at-row__align--center at-row__justify--center' onClick={this.clickSearch.bind(this)}>
          <View className='at-icon at-icon-search search-icon'></View>
          <View className='search-text'>搜索商品</View>
        </View>

        <View className=''>

        </View>

      </View>

    )
  }
}
