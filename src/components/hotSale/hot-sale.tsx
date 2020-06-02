import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import ScrollXView from '@/components/scrollXView/scrollX-view'
import { getHotSalePage } from '@/servers/servers.js'
import './hot-sale.scss';

export default class HotSale extends Component {
    constructor(props){
        super(props)
    }
    state = {
      list:[],
      current:0
    }
    slideChange(){
      const {current} = this.state ;
      const length = this.state.list.length-1;
      this.setState({
        current:current === length ? 0 :current + 1
      },()=>{
      })
    }
    async getHotSalePage() {
      let res = await getHotSalePage()
      if (res.code === 200) {
        this.setState({
          list: res.data.records || []
        })
      }
    }
    async componentWillMount(){
      this.getHotSalePage()
    }
    render() {
      const {list} = this.state ;
        return (
          <View className='hot'>
            <View className='text'>热卖商品</View>
            <View className='container'>
              <ScrollXView list={list} ratio={5}></ScrollXView >
              {/* <View className='slide'>
                <View style={{'left':this.state.current*50+'rpx'}} className='move-block'></View>
              </View> */}
            </View>
          </View>
        )
    }
}
