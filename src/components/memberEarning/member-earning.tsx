import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './member-earning.scss'
interface propsType  {
  // renderResult: Element
}
export default class MemberEarning extends Component<propsType> {
  constructor(props){
    super(props)
}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  // config: Config = {
  //   navigationBarTitleText: '我的会员',
  // }

  state = {
    conditions: [
      {
        value: '7',
        lable: '最近7天'
      },
      {
        value: 'yestoday',
        lable: '昨日'
      },
      {
        value: 'all',
        lable: '全部'
      }
    ],
    time: '7'
  }
  clickCondition (value) {
    this.setState({
      time: value
    })
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { conditions, time } = this.state
    const conditionsItem = conditions.map(item => {
      return <View onClick={this.clickCondition.bind(this, item.value)} className={`conditions-item ${time === item.value ? 'actived' : ''}`}>{item.lable}</View>
    })
    return (
      <View className='member-earning'>
        {this.props.children}
        <View className='conditions'> {conditionsItem} </View>
      </View>
    )
  }
}
