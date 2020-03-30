import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'
import { AtRate,AtGrid } from 'taro-ui'
import './rate-detail.scss'
import RateDetailList from '@/components/rateDetailList/rate-detail-list';

export default class RateDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '评论',
  }
  state = {
    rateData:[
      {
        name:'ws',
        nick_name:'white swan',
        rate:4.5,
        time:'2019-09-12 18:46',
        course:'小升初综合辅导',
        content:'教室环境很好，老师授课耐心'
      },
      {
        name:'h',
        nick_name:'white swan',
        rate:5,
        time:'2019-09-16 18:46',
        course:'小升初综合辅导',
        content:'教室环境很好，老师授课耐心'
      },
      {
        name:'j',
        nick_name:'white swan',
        rate:5,
        time:'2019-09-19 18:46',
        course:'小升初综合辅导',
        content:'教室环境很好，老师授课耐心'
      },
      {
        name:'w',
        nick_name:'white swan',
        rate:4.5,
        time:'2019-09-20 18:46',
        course:'小升初综合辅导',
        content:'教室环境很好，老师授课耐心'
      }
    ],
    tagList:[
      {
        tagName:'全部',
        number:'2964'
      },
      {
        tagName:'最新',
        number:'240'
      },
      {
        tagName:'有图',
        number:'100'
      },
      {
        tagName:'追评',
        number:'20'
      },
      {
        tagName:'质量上乘',
        number:'248'
      },
      {
        tagName:'很舒服',
        number:'56'
      },
      {
        tagName:'性价比高',
        number:'264'
      },
      {
        tagName:'保暖性好',
        number:'33'
      },
      {
        tagName:'差评',
        number:'1'
      },
      {
        tagName:'实惠有用',
        number:'324'
      }
    ],
    showMoreFlag:false,
    activeIndex:0
  }

  toggle(){
    this.setState({
      showMoreFlag:!this.state.showMoreFlag
    })
  }
  clickTag(item,index){
    this.setState({
      activeIndex:index
    })
  }
  componentWillMount () { 
    console.log(this.$router.params) 
  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {rateData=[],tagList,showMoreFlag,activeIndex} = this.state ;
    const tag = tagList.map((item,index)=>{
        return <View key={item.tagName} onClick={this.clickTag.bind(this,item,index)} className={`tag-item ${activeIndex===index?'active':''}`}>{item.tagName}({item.number})</View>
    })
    return (
      <View className='rate-detail'>
        <View className='head'>
          <View>评价</View>
          <AtRate className='head-rate' size={15} value={5} />
          <View>94.8% 好评</View>
        </View>
        <View className={`tag ${showMoreFlag?'':'tag-2'}`}>
          {tag}
        </View>
        <View className='icon'>
          <View className={`at-icon ${showMoreFlag?'at-icon-chevron-up':'at-icon-chevron-down'}`} onClick={this.toggle.bind(this)}></View>
        </View>
        <View className='rate-list'>
          <RateDetailList border-class='border-class' data={rateData} />
        </View>
      </View>
    )
  }
}
