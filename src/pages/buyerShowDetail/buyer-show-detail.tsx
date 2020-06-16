import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem,  AtButton, AtModal } from "taro-ui"
import SwiperList from '@/components/swiper/swiper';
import TaroCanvasDrawer from '@/components/taroPluginCanvas'
import './buyer-show-detail.scss'

export default class BuyerShowDetail extends Component {

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
    banner: [
      {
        id: 1,
        imageUrl: require('@/assets/images/banner.jpg')
      },
      {
        id: 2,
        imageUrl: require('@/assets/images/banner1.jpg')
      }
    ],
    openShare: false,
    canvasStatus: false,
    shareImage: '',
    showPoster: false,
    config: null,
    ssrConfig: {
      width: 750,
      height: 850,
      backgroundColor: '#fff',
      debug: false,
      blocks: [
        {
          x: 0,
          y: 0,
          width: 750,
          height: 850,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 0,
          // borderColor: '#ccc',
          backgroundColor: '#EFF3F5',
          borderRadius: 0,
        },
        {
          x: 40,
          y: 40,
          width: 670,
          height: 770,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 0,
          // borderColor: '#ccc',
          backgroundColor: '#fff',
          borderRadius: 12,
        }
      ],
      texts: [
        {
          x: 80,
          y: 420,
          text: '@kk...在NEW-RETAIL买家秀（社区）发作品啦~~快来看一下吧！',
          fontSize: 32,
          color: '#000',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 48,
          lineNum: 2,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },
        {
          x: 375,
          y: 740,
          text: '长按扫描进入',
          fontSize: 24,
          color: '#999',
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'center',
          lineHeight: 36,
          lineNum: 1,
          zIndex: 999,
        },
        {
          x: 375,
          y: 790,
          text: '查看更多买家秀分享',
          fontSize: 24,
          color: '#333',
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'center',
          lineHeight: 36,
          lineNum: 1,
          zIndex: 999,
        }
      ],
      images: [
        {
          url: require('@/assets/images/banner.jpg'),
          width: 670,
          height: 320,
          y: 40,
          x: 40,
          borderRadius: 12,
          zIndex: 10,
          // borderRadius: 150,
          // borderWidth: 10,
          // borderColor: 'red',
        },
        {
          url: 'https://pic.juncao.cc/cms/images/minapp.jpg', // 放小程序的二维码 可通过调后端接口获得
          width: 110,
          height: 110,
          y: 570,
          x: 320,
          borderRadius: 100,
          borderWidth: 0,
          zIndex: 10,
        },
      ],
      lines: [
        {
          startY: 540,
          startX: 80,
          endX: 670,
          endY: 541,
          width: 1,
          color: '#ddd',
        }
      ]
    }
  }
  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc() {
    if (this.state.shareImage) {
      this.setState({
        showPoster: true
      })
      this.closeSheet()
      return false
    }
    Taro.showLoading({
      mask: true,
      title: '绘制中...'
    })
    this.setState({
      canvasStatus: true,
      config: this.state.ssrConfig
    })
  }
   // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
   onCreateSuccess (result) {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading()
    this.closeSheet()
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        shareImage: tempFilePath,
        // 重置 TaroCanvasDrawer 状态，方便下一次调用
        canvasStatus: false,
        config: null,
        showPoster: true
      })
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      this.setState({
        canvasStatus: false,
        config: null
      })
      Taro.showToast({ icon: 'none', title: errMsg || '出现错误' });
      console.log(errMsg);
    }
    // 预览
    // Taro.previewImage({
    //   current: tempFilePath,
    //   urls: [tempFilePath]
    // })
  }

  // 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  onCreateFail () {
    Taro.hideLoading();
    // 重置 TaroCanvasDrawer 状态，方便下一次调用
    this.setState({
      canvasStatus: false,
      config: null
    })
  }

   // 保存图片至本地
  async saveToAlbum() {
    const res = await Taro.saveImageToPhotosAlbum({
      filePath: this.state.shareImage || ''
    })
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showToast({
        title: '保存图片成功',
        icon: 'success',
        duration: 2000,
      })
    }
  }
  clickShare () {
    this.setState({
      openShare: true
    })
  }
  closeSheet () {
    this.setState({
      openShare: false
    })
  }
  closePoster () {
    this.setState({
      showPoster: false
    })
  }
  //设置分享页面的信息
  onShareAppMessage(res) {
    console.log(res)
    return {
      title: 'kk在NEW-RETAIL买家秀发作品啦~~快来看一下吧！',
      path: `/pages/buyerShowDetail/buyer-show-detail?id=${this.$router.params.id}`
    }
  }
  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    console.log('buyer-show-detail render')
    const { banner, openShare, config, canvasStatus, shareImage, showPoster } = this.state
    return (
      <View className='buyer-show-detail'>
          <View className='header'>
            <View className='avatar-img'><Image style='width:100%;' mode='widthFix' src={require('@/assets/images/show.jpg')}></Image></View>
            <View className='avatar-name'>
              <View className='name'>我的名字叫啥</View>
              <View className='time'>2020-01-01 21：38</View>
            </View>
          </View>
          <SwiperList list={banner} config = {{}} />
          <View className='proinfo'>枕头舒服也很美啊!</View>
          <View className='share'>
            <View onClick={this.clickShare.bind(this)} className='icon at-icon at-icon-external-link'></View>
            <View className='icon icon-heart at-icon at-icon-heart'></View>  点击成为第一个点赞的人吧
          </View>

          <AtActionSheet isOpened={openShare} cancelText='取消' onClose={this.closeSheet.bind(this)}>
            <AtActionSheetItem>
              <AtButton className='button-share' openType='share'>分享给微信好友</AtButton>
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.canvasDrawFunc.bind(this)}>
              <AtButton  className='button-share' >生成海报分享</AtButton>
            </AtActionSheetItem>
          </AtActionSheet>
          {canvasStatus &&
          (<TaroCanvasDrawer
              config={config} // 绘制配置
              onCreateSuccess={this.onCreateSuccess.bind(this)} // 绘制成功回调
              onCreateFail={this.onCreateFail.bind(this)} // 绘制失败回调
            />
            )
          }
          {shareImage && <AtModal isOpened={showPoster} onClose={this.closePoster.bind(this)}>
              <Image
                src={shareImage}
                mode='widthFix'
                lazy-load
              />
              <View className='album-button'><AtButton type='primary' onClick={this.saveToAlbum.bind(this)} >保存至相册</AtButton></View>
          </AtModal>}
      </View>
    )
  }
}
