import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar} from 'taro-ui'
import { searchProduct } from '@/servers/servers.js'
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
    list:[],
    showResult:false
  }
  async searchProduct () {
    let {  value } = this.state
    const res = await searchProduct({
      pageNo: 1,
      pageSize: 10,
      productName: value,
    })
    res.code === 200 && this.setState({
      list: res.data ? res.data.records: [],
      showResult: true
    })
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
    this.searchProduct()
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
