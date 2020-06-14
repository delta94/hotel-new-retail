import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Text} from '@tarojs/components'
import './buyer-show.scss'

const TAB = [ 
  {
    name: '最新'
  },
  {
    name: '推荐'
  }
]
export default class BuyerShow extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '买家秀',
  }

  state = {
    list: [
      {
        id: '1',
        city: '广州',
        cityPin: 'GuangZhou',
        imageUrl: require('@/assets/images/show.jpg'),
        nickName: 'kk',
        star: 20
      },
      {
        id: '2',
        city: '深圳',
        cityPin: 'ShenZhen',
        imageUrl: require('@/assets/images/show.jpg'),
        nickName: 'qq',
        star: 30
      }
    ],
    currentTab: TAB[0].name
  }
  clickPublish () {
    Taro.navigateTo({
      url:'/pages/publishShow/publish-show'
    })
  }
  buyerShowDetail (item) {
    Taro.navigateTo({
      url:`/pages/buyerShowDetail/buyer-show-detail?id=${item.id}`
    })
  }
  changeTab (item) {
    this.setState({
      currentTab: item.name
    })
  }
  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  

  render () {
    console.log('buyer-show render')
    const { list, currentTab } = this.state
    const listItem = list.map(item => {
      return <View key='id' className='buyer-item' onClick={this.buyerShowDetail.bind(this, item)}>
        <Image style='width:100%;' mode='widthFix' src={item['imageUrl']}></Image>
        <View className='buyer-city'>
          <View className='city-pin'>{item['cityPin']}</View>
          <View className='icon at-icon at-icon-map-pin'></View> {item['city']}
        </View>
        <View className='buyer-info'>{item['nickName']}  被{item['star']}人点赞了</View>
      </View>
    })
    const tabItem = TAB.map(item => {
          return <Text key='name' onClick={this.changeTab.bind(this, item)} className={`tab-item ${item.name===currentTab ? 'actived': ''}`}>{item.name}</Text>
    })
    return (
      <View className='buyer-show'>
          <View className='buy-header'>
            <View className='tab'>
              {tabItem}
            </View>
            <View className='camera'><View onClick={this.clickPublish.bind(this)} className='icon at-icon at-icon-camera'></View></View>
          </View>
          <View className='buyer-content'>
            {listItem}
          </View>
      </View>

    )
  }
}
