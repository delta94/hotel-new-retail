import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtActionSheet, AtActionSheetItem, AtCheckbox } from 'taro-ui'
import { commafy } from '@/utils/index'
import './order-management.scss'

export default class OrderManagement extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '订单管理',
  }

  state = {
    tabs: [
      {
        value: 'all',
        lable: '全部'
      },
      {
        value: 'pay',
        lable: '待付款'
      },
      {
        value: 'send',
        lable: '待发货'
      },
      {
        value: 'get',
        lable: '待收货'
      },
      {
        value: 'star',
        lable: '待评价'
      }
    ],
    tab: 'all',
    list: [
      {
        category: '酒店同款',
        name: '舒适枕头',
        statusName: '已关闭',
        status: 'closed',
        url: require('@/assets/images/banner1.jpg'),
        skuName: '家庭式',
        sku: '45x30cm*2',
        totalPrice: '100',
        actualPrice: '80'
      },
      {
        category: '酒店同款',
        name: '丝滑被套',
        statusName: '已完成',
        status: 'done',
        url: require('@/assets/images/banner1.jpg'),
        skuName: '家庭式',
        sku: '45x30cm*2',
        totalPrice: '100',
        actualPrice: '80'
      },
      {
        category: '酒店同款',
        name: '超大床单',
        statusName: '待付款',
        status: 'pay',
        url: require('@/assets/images/banner1.jpg'),
        skuName: '家庭式',
        sku: '45x30cm*2',
        totalPrice: '100',
        actualPrice: '80'
      },
      {
        category: '酒店同款',
        name: '舒适枕头',
        statusName: '待收货',
        status: 'accept',
        url: require('@/assets/images/banner1.jpg'),
        skuName: '家庭式',
        sku: '45x30cm*2',
        totalPrice: '100',
        actualPrice: '80'
      },
      {
        category: '酒店同款',
        name: '舒适枕头',
        statusName: '待发货',
        status: 'send',
        url: require('@/assets/images/banner1.jpg'),
        skuName: '家庭式',
        sku: '45x30cm*2',
        totalPrice: '100',
        actualPrice: '80'
      }
    ],
    reasonList: [
      {
        value: '价格有点贵',
        label: '价格有点贵'
      },
      {
        value: '规格/款式/数量拍错',
        label: '规格/款式/数量拍错'
      },
      {
        value: '收货信息拍错',
        label: '收货信息拍错'
      },
      {
        value: '暂时不需要了',
        label: '暂时不需要了'
      },
      {
        value: '其他',
        label: '其他'
      }
    ],
    statusAction: {
      closed: [
        {
          text: '删除订单',
          click: this.deleteOrder
        }
      ],
      done: [
        {
          text: '删除订单',
          click: this.deleteOrder
        }
      ],
      pay: [
        {
          text: '取消订单',
          click: this.cancelOrder
        },
        {
          text: '立即付款',
          click: this.payOrder,
          type: 'secondary'
        }
      ],
      send: [
        {
          text: '联系卖家',
          click: this.cancat,
          openType: 'contact'
        },
        {
          text: '提醒发货',
          click: this.remindSend,
          type: 'secondary'
        }
      ],
      accept: [
        {
          text: '查看物流',
          click: this.checkFlow
        },
        {
          text: '确认收货',
          click: this.comfirmAccept,
          type: 'secondary'
        }
      ]
    },
    isOpenCancel: false,
    reasonCheckList: []
  }
  deleteOrder (item) {
    console.log(item)
  }
  cancelOrder (item) {
    console.log(item)
    this.setState({
      isOpenCancel: true
    })
  }
  payOrder (item) {
    console.log(item)
  }
  cancat (item) {
    console.log(item)
  }
  remindSend (item) {
    console.log(item)
  }
  checkFlow (item) {
    console.log(item)
  }
  comfirmAccept (item) {
    console.log(item)
  }
  clickTab (tab) {
    this.setState({
      tab
    })
  }
  toggleCancel () {
    this.setState({
      isOpenCancel: false
    })
  }
  handleChangeReason (value) {
    this.setState({
      reasonCheckList: value
    })
  }
  goOrderDetail (item) {
    Taro.navigateTo({
      url: `/pages/orderDetail/order-detail?id=${item.id}`
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
    const { tabs, tab, list, statusAction, isOpenCancel, reasonList, reasonCheckList } = this.state
    const headerItem = tabs.map(item => {
      return <View key='value' onClick={this.clickTab.bind(this, item.value)} className={`header-item ${tab === item.value ? 'actived' : ''}`}>{item.lable}</View>
    })
    const listItem = list.map(item => {
      const btns = statusAction[item.status] || []
      const btnItem = btns.map(it => {
        return <AtButton key='text' openType={it.openType} type={it.type} size='small' full={false} onClick={it.click.bind(this, item)} >{it.text}</AtButton>
      })
      return <View className='list-item' key='status'>
          <View className='list-item-title'>
            <View className='title-text'>{item.category} {item.name}</View>
            <View className='title-status'>{item.statusName}</View>
          </View>
          <View className='list-item-content'>
            <View className='content-left'><Image style='width:100%;' mode='widthFix' src={item['url']}></Image></View>
            <View className='content-right'>
              <View className='sku'>
                <Text className='sku-name'>{item.skuName}-{item.sku}</Text>
                <Text onClick={this.goOrderDetail.bind(this, item)}>查看详情&gt;</Text>
              </View>
              <View className='price'>
                <Text className='price-total'>总价：¥{item.totalPrice}　</Text>
                <Text className='price-actual'>实付款：¥{item.actualPrice}</Text>
              </View>
              <View className='btn-list'>
                {btnItem}
              </View>
            </View>
          </View>
      </View>
    })
    return (
        <View className='order-management'>
          <View className='header'>
            {headerItem}
          </View>
          <View className='list'>
            {listItem}
          </View>

          <AtActionSheet isOpened={isOpenCancel} cancelText='' onClose={this.toggleCancel.bind(this, false)}>
            <AtActionSheetItem>
              <View className='cancel-panel'>
                <View className='cancel-panel-title'>订单取消</View>
                <View className='cancel-panel-tip'>取消后无法恢复，优惠券、红包可退回，有效期内使用</View>
                <View className='cancel-panel-reason-title'>请选择取消订单原因</View>
                <View className='cancel-panel-reason-list'>
                  <AtCheckbox
                    options={reasonList}
                    selectedList={reasonCheckList}
                    onChange={this.handleChangeReason.bind(this)}
                  />
                </View>
                <View className='cancel-panel-footer'>
                  <View className='btn'>取消</View>
                  <View className='btn'>确认</View>
                </View>
              </View>
            </AtActionSheetItem>
          </AtActionSheet>
        </View>
    )
  }
}
