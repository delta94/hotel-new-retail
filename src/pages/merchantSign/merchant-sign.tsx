import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Image, ScrollView, Text } from '@tarojs/components'
import { AtButton, AtTextarea  } from 'taro-ui'
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
    scrollIntoViewId: 'step1'
  }


  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    const { stepList, scrollIntoViewId } = this.state
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
      </View>
    )
  }
}
