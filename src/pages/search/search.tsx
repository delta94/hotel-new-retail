import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton ,AtSearchBar,AtInput} from 'taro-ui'
import ProductGrid from '@/components/productGrid/product-grid';
import './search.scss'

export default class Cate extends Component {


  config: Config = {
    navigationBarTitleText: '搜索商品',
  }
  state = {
    value:'',
    hotWords:[
      {
        name:'枕头'
      },
      {
        name:'四件套'
      },
      {
        name:'床单'
      },
      {
        name:'被子'
      },
      {
        name:'床垫'
      },
      {
        name:'电热毯'
      }
    ],
    historyWords:[
      {
        name:'被子'
      },
      {
        name:'床单'
      }
    ],
    list:[
      {
        id:1,
        mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
        name:'商品',
        character:'课程特点，优点简介',
        price:150
      },
      {
        id:2,
        mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
        name:'商品',
        character:'课程特点，优点简介',
        price:150
      },
      {
        id:3,
        mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
        name:'商品',
        character:'课程特点，优点简介',
        sale_price:199,
        price:129
      },
      {
        id:4,
        mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
        name:'商品',
        character:'课程特点，优点简介',
        sale_price:199,
        price:129
      },
      {
        id:5,
        mainPictureUrl:require('../../assets/images/hotel-same1.jpg'),
        name:'商品',
        character:'课程特点，优点简介',
        sale_price:189,
        price:119
      }
    ],
    showResult:false
  }
  onFocus(){
    this.setState({
      showResult: false
    })
  }
  onChange(value){
    this.setState({
      value: value
    })
  }
  onActionClick(){
    this.setState({
      showResult: true
    })
  }
  componentWillMount () { }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {hotWords, historyWords, list,showResult} = this.state
    const hotItem = hotWords.map((item)=>{
        return <View className='content-item' key='name'>{item.name}</View>
    })
    const historyItem = historyWords.map((item)=>{
        return <View className='content-item' key='name'>{item.name}</View>
    })
    return (
      <View className='search'>
         <AtSearchBar
            showActionButton
            focus={true}
            placeholder='搜索...'
            value={this.state.value}
            onFocus={this.onFocus.bind(this)}
            onChange={this.onChange.bind(this)}
            onConfirm={this.onActionClick.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
          {!showResult?<View className='hot-word-and-history'>
            <View className='hot-word'>
              <View className='title'>热词</View>
              <View className='content'>{hotItem}</View>
            </View>
            <View className='search-history'>
              <View className='title'>历史搜索</View>
              <View className='content'>{historyItem}</View>
            </View>
          </View>
          :
          <View className='serach-result'><ProductGrid list={list}></ProductGrid></View>}
      </View>

    )
  }
}
