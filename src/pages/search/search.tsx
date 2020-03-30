import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton ,AtSearchBar,AtInput} from 'taro-ui'
import './search.scss'

export default class Cate extends Component {


  config: Config = {
    navigationBarTitleText: '搜索',
  }
  
  componentWillMount () { }

  componentDidMount () {
  
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='cate'>
          搜索页面
      </View>
      
    )
  }
}
