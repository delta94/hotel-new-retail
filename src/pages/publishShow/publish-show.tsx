import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtButton, AtTextarea  } from 'taro-ui'
import { uploadFile } from '@/servers/servers.js'
import { getCity } from '@/utils/auth'
import './publish-show.scss'

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
    city: []
  }
  handleChange (value) {
    this.setState({
      info: value
    })
  }
  choiceImage () {
    Taro.chooseImage({
      sourceType: ['album', 'camera'],
    }).then(res => {
      uploadFile(res.tempFilePaths[0]).then(res => {
        console.log(res)
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
  componentWillMount () { }

  componentDidMount () {
    this.getCity()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  

  render () {
    console.log('buyer-show render')
    const { city } = this.state
    console.log(city)
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
            <AtButton type='primary'>发布</AtButton>
          </View>
      </View>

    )
  }
}
