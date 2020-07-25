import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtModal } from 'taro-ui'
import './cash-money.scss'
import CashAction from '@/components/cashAction/cash-action'

export default class CashMoney extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '立即提现',
  }

  state = {
    isOpen: false,
    isAction: false
  }
  handleClose () {
    this.setState({
      isOpen: false
    })
  }
  handleOpen () {
    this.setState({
      isOpen: true
    })
  }
  goCashAction () {
    this.setState({
      isAction: true
    })
  }
  goCashLog () {
    Taro.navigateTo({
      url: '/pages/cashLog/cash-log'
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
    const { isOpen, isAction } = this.state
    return (
       !isAction ?
        <View className='cash-money'>
          <View className='cash-content'>
            <View className='icon-mony'><View className='at-icon at-icon-money'></View></View>
            <View className='cash-amount-text'>可提现金额 <View onClick={this.handleOpen.bind(this)} className='icon at-icon at-icon-alert-circle'></View></View>
            <View className='cash-amount'>¥ 900</View>
            <View className='cash-btn'>
              <AtButton onClick={this.goCashAction.bind(this)} circle={true}  type='primary'>提现</AtButton>
            </View>
          </View>
          <View onClick={this.goCashLog.bind(this)} className='cash-log'>提现记录</View>
            <AtModal
            isOpened={isOpen}
            title='提现说明'
            cancelText=''
            confirmText='我知道了'
            onClose={ this.handleClose.bind(this) }
            onCancel={ this.handleClose.bind(this) }
            onConfirm={ this.handleClose.bind(this) }
            content='到账时间是否有限额撒旦范德萨范德萨发给大锅饭大概士大夫但是古典风格'
          />
        </View>
          : <CashAction cashNumber ={900.01}></CashAction>
    )
  }
}
