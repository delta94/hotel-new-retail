import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Image, ScrollView, Text } from '@tarojs/components'
import { AtButton, AtInput, AtCheckbox  } from 'taro-ui'
import { uploadFile } from '@/servers/servers.js'
import './merchant-sign.scss'
export default class MerchantSign extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '立即申请',
  }

  state = {
    stepList: [
      {
        id: '1',
        name: '提交申请资料'
      },
      {
        id: '2',
        name: '面谈沟通'
      },
      {
        id: '3',
        name: '合同签署'
      },
      {
        id: '4',
        name: '申请成功'
      }
    ],
    businessOptions: [
      {
        value: 'outin',
        label: '国内酒店'
      },
      {
        value: 'outside',
        label: '港澳台/国际酒店'
      }
    ],
    checkedOptions: [
      {
        value: true,
        label: '我已经阅读并同意'
      }
    ],
    businessList: [],
    city: [],
    hotelName: '',
    phoneNumber: '',
    code: '',
    licence: '',
    checked: [],
    scrollIntoViewId: 'step1'
  }
  changeBusiness (value) {
    this.setState({
      businessList: value
    })
  }
  handleChangeArae (e) {
    this.setState({
      city: e.detail.value
    })
  }
  handleChange () {

  }
  getCode () {

  }
  uplaodLicence () {
    Taro.chooseImage({
      sourceType: ['album', 'camera'],
      count: 1
    }).then(async res => {
      let idx = 0
      let length = res.tempFilePaths.length
      let imagesList: Array<any> = []
      while (idx < length) {
        let result = await uploadFile(res.tempFilePaths[idx])
        imagesList.push(JSON.parse(result.data).data)
        idx++
      }
      this.setState({
        licence: imagesList[0].downloadUrl
      })
    })
  }
  checkServer (value) {
    this.setState({
      checked: value
    })
  }
  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    const { stepList, scrollIntoViewId, businessOptions, businessList, city, hotelName, phoneNumber, code, licence, checked, checkedOptions } = this.state
    const stepItem = stepList.map((item, index) => {
        return <View id={`step${item.id}`} key='id' className='step-item'>
                <Text className={`name ${scrollIntoViewId === 'step' + item.id ? 'actived' : ''}`}>{item.id}.{item.name}</Text>
                {index < stepList.length - 1 && <View className='dashed'></View>}
              </View>
    })
    return (
      <View className='merchant-sign'>
         <View className='steps'>
            <ScrollView scrollX scroll-into-view={scrollIntoViewId} className="scrollX">
              {stepItem}
            </ScrollView>
         </View>
         <View className='form'>

           <View className='label'>目前意向合作的业务</View>
           <View className='label-content'><AtCheckbox options={businessOptions} selectedList={businessList} onChange={this.changeBusiness.bind(this)} /></View>

           <View className='label-line'>
              <View className='label'>意向城市</View>
              <View className='label-content'>
                  <Text>{city.slice(0,2).join('')}</Text>
                  <Picker  mode='region' value={city}  onChange={this.handleChangeArae.bind(this)}>
                    请选择 <View className='icon at-icon at-icon-chevron-down'></View>
                  </Picker>
              </View>
           </View>

           <View className='label'>酒店名称</View>
           <View className='label-content'>
            <AtInput
                className='border-input'
                border={false}
                name='hotelName'
                type='text'
                placeholder=''
                value={hotelName}
                onChange={this.handleChange.bind(this)}
              />
           </View>

           <View className='label'>联系人手机号码</View>
           <View className='label-content'>
            <AtInput
                className='border-input'
                border={false}
                name='phoneNumber'
                type='phone'
                placeholder=''
                value={phoneNumber}
                onChange={this.handleChange.bind(this)}
              />
           </View>

           <View className='label'>短信验证码</View>
           <View className='label-content label-content-line'>
             <View className='label-content-line__left'>
               <AtInput
                  className='border-input'
                  border={false}
                  name='code'
                  type='number'
                  placeholder=''
                  value={code}
                  onChange={this.handleChange.bind(this)}
                />
             </View>
            <AtButton className='label-content__button'  onClick={this.getCode.bind(this)} full={false} circle={true} size='small' type='primary'>获取短信验证码</AtButton>
            </View>

           <View className='label'>营业执照</View>
           <View className='label-content label-content-line'>
              <AtButton className='label-content__button'  onClick={this.uplaodLicence.bind(this)} full={false} circle={true} size='small' type='primary'>上传图片</AtButton>
           </View>
           {licence && <View className='licence-img'>
              <Image  style='width:40%;' mode='widthFix' src={licence}></Image>
           </View>}

           <View className='label-content label-content-line'>
               <AtCheckbox className='no-margin-right' options={checkedOptions} selectedList={checked} onChange={this.checkServer.bind(this)} />
               <Text className='server-terms'>《xx平台服务条款》</Text>
           </View>

           <AtButton  circle={true}  type='primary'>确认提交</AtButton>

          </View>
      </View>
    )
  }
}
