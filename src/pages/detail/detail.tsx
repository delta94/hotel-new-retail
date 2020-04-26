import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtToast, AtButton, AtList, AtListItem, AtActionSheet, AtActionSheetItem,AtInputNumber } from 'taro-ui'
import './detail.scss'
import RateDetailList from '@/components/rateDetailList/rate-detail-list';
import PeopleWatch from '@/components/peopleWatch/people-watch'
import FooterCarBuy from '@/components/footCarBuy/foot-car-buy'
import SwiperList from '@/components/swiper/swiper';

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
  }



  state = {
    list: [{
      imageUrl: require('@/assets/images/banner.jpg'),
      id: 1
    },
    {
      imageUrl: require('@/assets/images/banner.jpg'),
      id: 2
    },
    {
      imageUrl: require('@/assets/images/banner.jpg'),
      id: 3
    },
    {
      imageUrl: require('@/assets/images/banner.jpg'),
      id: 4
    }],
    data: {
      price: '499',
      desc: '课程名称课程简介介绍课程课程课程',
      sale_number: 6666,
      tips: '7天未报到自动退款',
      reason: ['师资优良，结合中西方教学优点', '师资优良，结合中西方教学优点']
    },
    swiperH: '',
    current: 1,
    isOpened: false,
    isCourseOpend: false,
    toastText: '',
    choiceCourseId: 1,
    pricePerCourse: 100,
    value:2,
    rateData: [
      {
        name: 'ws',
        nick_name: 'white swan',
        rate: 4.5,
        time: '2019-09-12 18:46',
        course: '小升初综合辅导',
        content: '教室环境很好，老师授课耐心'
      }
    ]
  }


  componentWillMount() {
    console.log(this.$router.params)
  }
  //设置分享页面的信息
  onShareAppMessage(res) {
    console.log(res)
    return {
      title: '这个课程真棒，快来围观吧！',
      path: `/pages/detail/detail?id=${this.$router.params.id}`
    }
  }

  slideChange = ()=> {
    const { current } = this.state;
    const length = this.state.list.length;
    this.setState({
      current: current === length ? 1 : current + 1
    }, () => {
      // console.log(this.state.current)
    })
  }
  collect() {
    this.setState({
      isOpened: true,
      toastText: '收藏成功'
    })
  }
  toastClose() {
    this.setState({
      isOpened: false,
    })
  }

  openChoiceCourse() {
    this.setState({
      isCourseOpend: true
    })
  }
  closeChoiceCourse() {
    this.setState({
      isCourseOpend: false
    })
  }
  choiceCouseChange(item, index) {
    this.setState({
      choiceCourseId: index
    })
  }
  toOrgInfo() {
    Taro.navigateTo({
      url: `/pages/orgInfomation/orgInfomation?id=${this.$router.params.id}`
    })
  }
  toRateDetail() {
    Taro.navigateTo({
      url: `/pages/rateDetail/rate-detail?id=${this.$router.params.id}`
    })
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  render() {
    console.log('detail render')
    const { list, current, isOpened, toastText, data, rateData, isCourseOpend, choiceCourseId, pricePerCourse } = this.state;
    const totalPage = list.length;
    const reason = data.reason.map((item, index) => {
      return <View className='reason-item' key={index}>
        <View className='reason-index'>{index + 1}</View>
        <View className='reason-text'>{item}</View>
      </View>
    })

    const courseAttr = ['一', '两', '三', '四'].map((item, index) => {
      return <View key={index} onClick={this.choiceCouseChange.bind(this, item, index)} className={`attr-list-item ${choiceCourseId === index ? 'active' : ''}`}>{item}节</View>
    })
    return (
      <View className='detail'>
        <View className='swiper'>
          <SwiperList list={list} change={this.slideChange} />
          <View className='page'>
            {current}/{totalPage}
          </View>
          <View className='icon'>
            <View className='icon-item icon-collect' onClick={this.collect.bind(this)}>
              <View className='at-icon at-icon-star'></View>
            </View>
            <View className='icon-item icon-share'>
              <AtButton className='button-share' openType='share'></AtButton>
              <View className='at-icon at-icon-share'></View>
            </View>
          </View>
        </View>
        <AtToast isOpened={isOpened} onClose={this.toastClose.bind(this)} text={toastText} status='success' duration={2000}></AtToast>
        {/* 课程描述 */}
        <View className='detail'>
          <View className='price'>¥{data.price}</View>
          <View className='desc-sale'>
            <View className='desc'>{data.desc}</View>
            <View className='line'></View>
            <View className='sale'>
              <Text className='sale_number'>{data.sale_number}</Text>
              <Text className='sale_text'>销售量</Text>
            </View>
          </View>
          <View className='tips'>{data.tips}</View>
          <View className='reason'>
            <View className='reason-title'>推荐理由</View>
            <View className='reason-list'>
              {reason}
            </View>
          </View>
        </View>
        <View className='block-line'></View>
        {/* 已选、机构描述 */}
        <View className='list'>
          <AtList hasBorder={false}>
            <AtListItem title='已选择：两节' arrow='right' onClick={this.openChoiceCourse.bind(this)} />
            <AtListItem title='课程参数：XXXXXXX' arrow='right' />
            <AtListItem hasBorder={false} title='机构简介' arrow='right' onClick={this.toOrgInfo.bind(this)} />
          </AtList>
        </View>
        <View className='block-line'></View>
        <View className='rate-list'>
          <AtList hasBorder={false}>
            <AtListItem title='用户评价(116)' extraText='99%好评' onClick={this.toRateDetail.bind(this)} arrow='right' />
          </AtList>
        </View>
        <View className='rate-detail'>
          <RateDetailList data={rateData} />
        </View>
        <View className='block-line'></View>
        <PeopleWatch />
        <FooterCarBuy />
        {/* 选课面板 */}
        <AtActionSheet isOpened={isCourseOpend} onClose={this.closeChoiceCourse.bind(this)}>
          <AtActionSheetItem className='sheet-item-content'>
            <View className='sheet'>
              <View className='price'>
                <View>
                  <Image className='vect' mode='widthFix' src={require('@/assets/images/banner.jpg')}></Image>
                </View>
                <View className='price_tip'>
                  <View className='total-price'>价格：¥{(choiceCourseId + 1) * pricePerCourse}</View>
                  <View className='tip'>库存：132件</View>
                  <View className='tip'>已选：“酒店同款”“45*30cm”</View>
                </View>
              </View>
            </View>
          </AtActionSheetItem>
          <AtActionSheetItem>
            <View className='attr'>
              <View className='attr-text'>款式</View>
              <View className='attr-list'>
                {courseAttr}
              </View>
            </View>
          </AtActionSheetItem>
          <AtActionSheetItem>
            <View className='attr'>
              <View className='attr-text'>尺寸</View>
              <View className='attr-list'>
                {courseAttr}
              </View>
            </View>
          </AtActionSheetItem>
          <AtActionSheetItem>
            <View className='attr'>
              <View className='attr-text'>购买数量</View>
              <AtInputNumber
                type='number'
                min={0}
                max={10}
                step={1}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              />
            </View>
          </AtActionSheetItem>
          <AtActionSheetItem className='sheet-item-btn'>
            <AtButton type='primary'>确定</AtButton>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
