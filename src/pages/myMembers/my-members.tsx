import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import MemberEarning from '@/components/memberEarning/member-earning'
import './my-members.scss'

export default class MyMembers extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的会员',
  }

  state = {
    membersList: [
      {
        avator: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
        nickName: 'white swan'
      },
      {
        avator: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
        nickName: 'black swan'
      },
      {
        avator: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
        nickName: '名称名称'
      }
    ]
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { membersList } = this.state
    const resultSlot = <View className=''>累计新增会员 <Text className='result-number'>9</Text> 人</View>
    const resultItem = membersList.map(item => {
      return <View className='result-item'>
            <Image className="avator" mode="widthFix"  src={item['avator']} ></Image>
            <View className='nickName'>{item['nickName']}</View>
      </View>
    })
    return (
      <View className='my-members'>
        <MemberEarning
        >
        {resultSlot}
        </MemberEarning>
        <View className="result-list">
        {resultItem}
        </View>
      </View>
    )
  }
}
