import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Image } from '@tarojs/components'
import { AtButton, AtTextarea  } from 'taro-ui'
import { uploadFile, saveBuyShow } from '@/servers/servers.js'
import { getCity, getUserInfo, checkSessionLogin } from '@/utils/auth'
import './publish-show.scss'
let USERINFO = ''
export default class PublishShow extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '买家秀分享',
  }

  state = {
    info: '',
    city: [],
    images: []
  }
  handleChange (value) {
    this.setState({
      info: value
    })
  }
  choiceImage () {
    Taro.chooseImage({
      sourceType: ['album', 'camera'],
    }).then(async res => {
      let idx = 0
      let length = res.tempFilePaths.length
      let imagesList: Array<any> = []
      while (idx < length) {
        let result = await uploadFile(res.tempFilePaths[idx])
        imagesList.push(JSON.parse(result.data).data)
        idx++
      }
      const { images } =this.state
      this.setState({
        images: [...images, ...imagesList]
      })
    })
  }
  handleChangeArae (e) {
    this.setState({
      city: e.detail.value
    })
  }
  async getCity () {
    const res = await getCity()
    if (!res) return
    let city: Array<any> = []
    const ad_info = res.result.ad_info
    city.push(ad_info.province)
    city.push(ad_info.city)
    city.push(ad_info.district)
    this.setState({
      city
    })
  }
  async getUserInfo () {
    USERINFO = await getUserInfo()
    return USERINFO
  }
  removeImage (index) {
    const { images } = this.state
    images.splice(index,1)
    this.setState({
      images
    })
  }
  publish () {
    const { images } = this.state
    const [province, city] = this.state.city
    const { nickName } = USERINFO['userInfo']
    saveBuyShow({
      province,
      city,
      nickName,
      mobileUserBuyingShowFileDtoReqList: images.map(item => {
        return {imageUrl: item['downloadUrl']}
      })
    })
  }
  async componentWillMount () {
    checkSessionLogin(() => {
      this.getCity()
      this.getUserInfo()
    })
  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    console.log('buyer-show render')
    const { city, images } = this.state
    const imageIten = images.map((item, index) => {
      return <View className='image-item' key='downloadUrl'>
            <View onClick={this.removeImage.bind(this, index)} className='icon at-icon at-icon-close-circle'></View>
            <Image key='downloadUrl' style='width:100%;' mode='widthFix' src={item['downloadUrl']}></Image>
          </View>
    })
    return (
      <View className='publish-show'>
          <View className='textarea'>
            <AtTextarea
              value={this.state.info}
              onChange={this.handleChange.bind(this)}
              maxLength={200}
              height={200}
              placeholder='想和大家分享什么...'
            />
          </View>
          <View className='image-list'>{imageIten}</View>
          <View className='add-image'>
            <View className='upload' onClick={this.choiceImage.bind(this)}>
              <View className='icon at-icon at-icon-add'></View>
              <View className=''>添加图片</View>
            </View>
          </View>
          <View className='city'>
            <View className='city-name'>
              <View className='icon at-icon at-icon-map-pin'></View> {city.slice(0,2).join('')}
            </View>
            <View className='city-pick'>
              <Picker  mode='region' value={city}  onChange={this.handleChangeArae.bind(this)}>
                选择其他城市 <View className='icon at-icon at-icon-chevron-down'></View>
              </Picker>
            </View>
          </View>
          <View className='footer fixed fixed-b'>
            <AtButton onClick={this.publish.bind(this)} type='primary'>发布</AtButton>
          </View>
      </View>

    )
  }
}
