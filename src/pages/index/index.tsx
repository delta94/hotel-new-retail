import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import './index.scss'
import HotSale from '@/components/hotSale/hot-sale';
import HotelSame from '@/components/hotelSame/hotel-same';
import SwiperList from '@/components/swiper/swiper';
import ProductGrid from '@/components/productGrid/product-grid';
import { getIndexBanner, getGuessYouLikePage } from '@/servers/servers.js'
const adUrl = require('@/assets/images/ad.jpg');

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor:'#fff',
    navigationBarTextStyle:'black',
    // navigationStyle:'custom'
  }

  state = {
    value:'',
    bannerList:[],
    sourceList:[
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '音乐'
      },
      {
        image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
        value: '书画'
      },
      {
        image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
        value: '舞蹈'
      },
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
        value: '辅导'
      },
      {
        image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
        value: '小学'
      },
      {
        image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
        value: '初中'
      },
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '高中'
      },
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '机构入驻'
      }
    ],
    likeList:[],
  }

  onChange(value){
    this.setState({
      value: value
    })
  }
  clickSearch(){
    //点击搜索框跳转到搜索页面
    Taro.navigateTo({
      url:'/pages/search/search'
    })
  }
  async getIndexBanner () {
    let res = await getIndexBanner()
    let bannerData = (res.data || []).map(item => {
      return  {
        id: item.id,
        imageUrl: item.itemValue
       }
    })
    this.setState({
      bannerList: bannerData
    })
  }
  async getGuessYouLikePage () {
    let res = await getGuessYouLikePage()
    if (res.code === 200) {
      this.setState({
        likeList: res.data.records || []
      })
    }
  }
  async componentWillMount () {
    this.getIndexBanner()
    this.getGuessYouLikePage()
  }
  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log('index render')
    const { bannerList,likeList } = this.state ;
    const swiperConfig = {}
    return (
      <View className='index'>
        {/* 首页搜索 */}
        <View className='search-header fixed fixed-t'>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-3 search' onClick={this.clickSearch.bind(this)}>
              <View className='at-icon at-icon-search search-icon'></View>
              <View className='color-placholder placholder'>搜索</View>
            </View>
            <View className='at-col at-col-6 text-center font-b'>NEW-RETAIL</View>
          </View>
        </View>
        <View className='swiper-container' >
          <SwiperList list={bannerList} config = {swiperConfig} />
        </View>
        {/* <View className='course-list'>
          <AtGrid columnNum={4} hasBorder={false} data={sourceList} />
        </View> */}
        <HotSale />
        <HotelSame />
        <View className='ad-list'>
          <Image style='width:100%;' mode='widthFix' src={adUrl}></Image>
        </View>
        <AtDivider content='猜你喜欢' fontColor='#000' lineColor='#e5e5e5' />
        <ProductGrid list={likeList}></ProductGrid>
      </View>
    )
  }
}
