import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './merchant-adv.scss'

export default class MerchantAdv extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  // config: Config = {
  //   navigationBarTitleText: '我是酒店商家',
  // }

  state = {
    reasonList: [
      {
        name: '用户优势',
        subText: '网民数量激增，且增长势头仍然不减缓，通过分销，平台无疑可以向更多人传递自己的产品和服务',
        icon: require('@/assets/tab-bar/user.png')
      },
      {
        name: '平台优势',
        subText: '网民数量激增，且增长势头仍然不减缓，通过分销，平台无疑可以向更多人传递自己的产品和服务',
        icon: require('@/assets/tab-bar/user.png')
      },
      {
        name: '产品优势',
        subText: '网民数量激增，且增长势头仍然不减缓，通过分销，平台无疑可以向更多人传递自己的产品和服务',
        icon: require('@/assets/tab-bar/user.png')
      }
    ],
    serverList: [
      {
        text: '正规高效的',
        subText: '入驻流程'
      },
      {
        text: '完善的业务',
        subText: '培训体系'
      },
      {
        text: '业务人员的',
        subText: '专属对接'
      },
      {
        text: '专业的',
        subText: '售后服务'
      }
    ],
    conditionsList: [
      {
        text: '具有正规的经营资质'
      },
      {
        text: '企业信用征信良好'
      },
      {
        text: '具有正规的经营资质'
      },
      {
        text: '企业信用征信良好'
      }
    ],
    flowList: [
      {
        text: '提交\n申请资料'
      },
      {
        text: '面谈\n沟通'
      },
      {
        text: '合同\n签署'
      },
      {
        text: '申请\n成功'
      }
    ]
  }
  apply () {
    Taro.navigateTo({url:'/pages/merchantSign/merchant-sign'})
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(DEV)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { reasonList, serverList, conditionsList, flowList } = this.state
    const reasonItem = reasonList.map(item => {
      return <View className='reason-item' key='name'>
          <Image style='width:30px;' mode='widthFix' src={item.icon}></Image>
          <View className='reason-text'>
            <View className='reason-name'>{item.name}</View>
            <View className='reason-subtext'>{item.subText}</View>
          </View>
      </View>
    })
    const serverItem = serverList.map(item => {
      return <View className='server-item' key='text'>
        <View>{item.text}</View>
        <View>{item.subText}</View>
      </View>
    })
    const conditionsItem = conditionsList.map((item, index) => {
      return <View className='conditions-item' key='text'>{index + 1}、{item.text}</View>
    })
    const flowItem = flowList.map(item => {
      return <View className='flow-item' key='text'>
        <Text>{item.text}</Text>
      </View>
    })
    return (
      <View className='merchant-adv'>
        <View className='ad-banner'>
          <Image style='width:100%;display:block;' mode='widthFix' src={require('@/assets/images/banner1.jpg')}></Image>
          <View className='ad-banner-text'>
            <View className='ad-title'>宣传语宣传语</View>
            <View className='ad-hot'>各城市酒店合作伙伴火热招募中...</View>
            <View className='ad-btn'><AtButton onClick={this.apply.bind(this)} full={false} circle={true} size='small' type='primary'>立即申请&gt; </AtButton></View>
          </View>
        </View>
        <View className='ad-reason'>
          <View className='reason-title'>选择本平台合作的理由</View>
          {reasonItem}
        </View>
        <View className='ad-server'>
          <View className='server-title'>我们的服务</View>
          <View className='server-item-wrap'>{serverItem}</View>
        </View>
        <View className='ad-conditions'>
          <View className='conditions-title'>合作条件</View>
          {conditionsItem}
        </View>
        <View className='ad-flow'>
          <View className='flow-title'>申请流程</View>
          <View className='flow-item-wrap'>{flowItem}</View>
        </View>
        <View className='footer fixed fixed-b'>
            <AtButton onClick={this.apply.bind(this)} type='primary'>立即申请</AtButton>
        </View>
      </View>
    )
  }
}
