import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtModal } from 'taro-ui'
import { commafy } from '@/utils/index'
import './cash-log.scss'

export default class CashLog extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '提现记录',
  }

  state = {
    tab: 1,
    monthData: [
      {
        month: '5',
        amount: '4353454',
        list: [
          {
            status: '申请中',
            date: '2020-5-7',
            amount: '345435'
          },
          {
            status: '交易成功',
            date: '2020-5-2',
            amount: '345435'
          },
          {
            status: '交易成功',
            date: '2020-6-2',
            amount: '34435'
          }
        ]
      },
      {
        month: '2',
        amount: '435454',
        list: [
          {
            status: '申请中',
            date: '2020-7-7',
            amount: '100343'
          }
        ]
      },
      {
        month: '9',
        amount: '12323',
        list: [
          {
            status: '申请中',
            date: '2020-8-23',
            amount: '1345435'
          }
        ]
      }
    ]
  }
  clickTab (tab) {
    this.setState({
      tab
    })
  }
  goCashDetail () {
    Taro.navigateTo({
      url: '/pages/cashDetail/cash-detail'
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
    const { tab, monthData } = this.state
    const dataItem = monthData.map(item => {
      const listItem = (item.list).map(it => {
        return <View key='amount' onClick={this.goCashDetail.bind(this)} className='cash-list-item__list-item'>
          <View className=''>
            <View className='status'>{it.status}</View>
            <View className='date'>{it.date}</View>
          </View>
          <View className='amount'>{commafy(it.amount)}</View>
        </View>
      })
      return <View key='amount' className='cash-list-item'>
          <View className='cash-list-item-title'>{item.month}月 已提现：{commafy(item.amount)}</View>
          <View className='cash-list-item__list'>{listItem}</View>
      </View>
    })
    return (
        <View className='cash-log'>
          <View className='cash-panel'>
            <View className='cash-panel-title'>可提现金额</View>
            <View className='cash-panel-amount'>{commafy(88888.70)}</View>
            <View className='cash-panel-bottom'>
              <View>已提现金额:{commafy(11100.99)}</View>
              <View>总金额:{commafy(240000000)}</View>
            </View>
          </View>

          <View className='cash-tab'>
            <View onClick={this.clickTab.bind(this,1)} className={`cash-tab-item ${tab === 1 ? 'actived' : ''}`}><Text>已提现\n金额记录</Text></View>
            <View onClick={this.clickTab.bind(this,2)} className={`cash-tab-item ${tab === 2 ? 'actived' : ''}`}><Text>总金额\n变化记录</Text></View>
          </View>
          <View className='cash-list'>{dataItem}</View>
        </View>
    )
  }
}
