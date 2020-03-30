import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import { AtToast, AtButton, AtList, AtListItem, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import './course-detail.scss'
import RateDetailList from '@/components/rateDetailList/rate-detail-list';
import PeopleWatch from '@/components/peopleWatch/people-watch'
import FooterCarBuy from '@/components/footCarBuy/foot-car-buy'

export default class CourseDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '课程详情',
    // navigationBarBackgroundColor:'#47cab3',
    navigationBarTextStyle: 'black',
  }



  state = {
    list: [{
      url: require('../../assets/images/banner.jpg'),
      id: 1
    },
    {
      url: require('../../assets/images/banner.jpg'),
      id: 2
    },
    {
      url: require('../../assets/images/banner.jpg'),
      id: 3
    },
    {
      url: require('../../assets/images/banner.jpg'),
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
      path: `/pages/courseDetail/course-detail?id=${this.$router.params.id}`
    }
  }

  slideChange() {
    const { current } = this.state;
    const length = this.state.list.length;
    this.setState({
      current: current === length ? 1 : current + 1
    }, () => {
      // console.log(this.state.current)
    })
  }
  onImgLoad(e) {
    this.refs.swiper.boundingClientRect((rect) => {
      const winWid = rect.width
      const imgh = e.detail.height;//图片高度
      const imgw = e.detail.width;//图片宽度
      const swiperH = winWid * imgh / imgw + "px" //
      this.setState({
        swiperH: swiperH//设置高度
      })
      console.log(rect.width)
    }).exec();
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
  render() {
    console.log('detail render')
    const { list, swiperH, current, isOpened, toastText, data, rateData, isCourseOpend, choiceCourseId, pricePerCourse } = this.state;
    const totalPage = list.length;
    const banner = list.map(item => {
      return <SwiperItem key={item.id}>
        <Image style='width:100%;' mode='widthFix' onLoad={this.onImgLoad.bind(this)} src={item.url}></Image>
      </SwiperItem>
    })
    const reason = data.reason.map((item, index) => {
      return <View className='reason-item' key={index}>
        <View className='reason-index'>{index + 1}</View>
        <View className='reason-text'>{item}</View>
      </View>
    })

    const courseAttr = ['一', '两', '三', '四'].map((item, index) => {
      return <View key={index} onClick={this.choiceCouseChange.bind(this, item, index)} className={`course-attr-list-item ${choiceCourseId === index ? 'active' : ''}`}>{item}节</View>
    })
    return (
      <View className='course-detail'>
        <View className='swiper'>
          <Swiper
            ref='swiper'
            style={{ height: swiperH }}
            className='test-h'
            indicatorColor='#aaa'
            indicatorActiveColor='#47cab3'
            onChange={this.slideChange.bind(this)}
            circular
            // indicatorDots
            autoplay
          >
            {banner}
          </Swiper>
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
        <View className='course-list'>
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
          <AtActionSheetItem>
            <View className='course-sheet'>
              <View className='course-price'>
                <View>
                  <Image className='vect' mode='widthFix' src={require('../../assets/images/banner.jpg')}></Image>
                </View>
                <View className='price_tip'>
                  <View className='total-price'>价格：¥{(choiceCourseId + 1) * pricePerCourse}</View>
                  <View className='course-tip'>请选择规格属性</View>
                </View>
              </View>
              <View className='course-attr'>
                <View className='course-attr-text'>规格</View>
                <View className='course-attr-list'>
                  {courseAttr}
                </View>
              </View>
            </View>
          </AtActionSheetItem>
          <AtActionSheetItem>
            <FooterCarBuy />
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
