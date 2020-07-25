import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import './cash-action.scss'
interface propsType  {
  cashNumber: number,
}
export default class CashAction extends Component<propsType> {
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
  //   navigationBarTitleText: '立即提现',
  // }

  state = {
    name: '',
    number: '',
    cash: ''
  }
  handleChange (prop, value) {
    this.setState({
      [prop]: value
    })
    return value
  }
  sumbit () {

  }
  cashAll () {
    this.setState({
      cash: this.props.cashNumber
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
    const { name, number, cash } = this.state
    console.log(cash)
    return (
      <View className='cash-action'>
        <View className='cash-action-content'>
          <AtInput
            name='name'
            title='账户名'
            type='text'
            placeholder=''
            value={name}
            onChange={this.handleChange.bind(this, 'name')}
          />
          <AtInput
            name='number'
            title='账户号'
            type='idcard'
            placeholder=''
            value={number}
            onChange={this.handleChange.bind(this, 'number')}
          />
          <View className='cash-action-title'>提现金额</View>
          <AtInput
            name='cash'
            title='¥'
            type='digit'
            placeholder=''
            value={cash}
            onChange={this.handleChange.bind(this, 'cash')}
          />
          <View className='cash-tip'>
            <Text className='cash-text'>可提现余额 <Text className='cash-amount'>{this.props.cashNumber}</Text>元</Text>
            <Text onClick={this.cashAll.bind(this)} className='cash-btn'>全部提现</Text>
          </View>
        </View>
        <View className='cash-btn'>
          <AtButton onClick={this.sumbit.bind(this)} circle={true}  type='primary'>提交</AtButton>
        </View>
      </View>
    )
  }
}
