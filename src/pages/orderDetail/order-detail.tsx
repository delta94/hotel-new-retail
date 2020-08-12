import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image , Text} from '@tarojs/components'
import { AtButton,AtGrid,AtList ,AtListItem} from 'taro-ui'
import './order-detail.scss'

export default class OrderDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '订单详情',
  }

  state = {

  }


  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    return (
      <View className='order-detail'>
        <View className='order-detail-clock'>
          <View>
            <View>等待买家付款</View>
            <View>还剩2时5分自动取消订单</View>
          </View>
          <View className='icon at-icon at-icon-clock'></View>
        </View>

        <View className='order-detail-receiveInfo'>
          <View className='icon at-icon at-icon-map-pin'></View>
          <View>
            <View className='user'><Text className='user-name'>李好 </Text> <Text className='user-phone'>86-123456789000</Text></View>
            <View>广东省 佛山市 南海区 桂城街道 海三路12号</View>
          </View>
        </View>

        <View className='order-detail-content'>
          <View className='content-title'>
            <Text>酒店同款 </Text>
            <Text>五星记忆棉枕头</Text>
          </View>
          <View className='content-body'>
            <View className='body-left'>
              <Image style='width:100%;' mode='widthFix' src={require('@/assets/images/banner1.jpg')}></Image>
            </View>
            <View className='body-right'>
              <View className='sku-price'>
                <View className='sku'>
                  家庭式-45*30cm*2
                </View>
                <View className='price'>
                  总价：¥100.0
                </View>
              </View>
              <View className='btn-list'>
                <AtButton key='text' size='small' full={false} >退换</AtButton>
                <AtButton key='text'  type='secondary' size='small' full={false} >立即付款</AtButton>
              </View>
            </View>
          </View>
          <View className='content-price'>
            <View className='price-item'>
              <Text>商品总价</Text> <Text>¥100.0</Text>
            </View>
            <View className='price-item'>
              <Text>运费(快递)</Text> <Text>¥10.0</Text>
            </View>
            <View className='price-item'>
              <Text>优惠活动名称</Text> <Text>-¥20.0</Text>
            </View>
            <View className='price-item'>
              <Text className='actal-title'>实付款</Text> <Text className='actal-price'>¥80.0</Text>
            </View>
          </View>
        </View>

        <View className='order-detail-footer'>
          <View className='title'>订单信息</View>
          <View className='order-item'>
            <Text>支付渠道 </Text>
            <Text>微信零钱</Text>
          </View>
          <View className='order-item'>
            <Text>订单编号 </Text>
            <Text>23243545657687867</Text>
          </View>
          <View className='order-item'>
            <Text>创建时间 </Text>
            <Text>2020-8-11 23:14:12</Text>
          </View>
          <View className='order-item'>
            <Text>付款时间 </Text>
            <Text>2020-8-11 23:45:13</Text>
          </View>
          <View className='order-item'>
            <Text>发货时间 </Text>
            <Text>2020-8-12 10:23:45</Text>
          </View>
        </View>

      </View>
    )
  }
}
