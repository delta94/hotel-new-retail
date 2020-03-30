import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import './recommend.scss';

export default class Recommend extends Component {
    constructor(props){
        super(props)
    }
    state = {
      list:[
        {
          id:0,
          children:[
            {
              url:require('../../assets/images/recommend1.png'),
              id:1
            },
            {
              url:require('../../assets/images/recommend2.png'),
              id:2
            },
            {
              url:require('../../assets/images/recommend3.png'),
              id:3
            },
            {
              url:require('../../assets/images/recommend4.png'),
              id:4
            }
          ]
        }
      ],
      current:0
    }
    slideChange(){
      const {current} = this.state ;
      const length = this.state.list.length-1;
      this.setState({
        current:current === length ? 0 :current + 1 
      },()=>{
        // console.log(this.state.current)
      })
    }
    componentWillMount(){
      let listMap:any = [];
      for(let val of new Array(0,1,2)){
        console.log(val)
        listMap = [...this.state.list,...listMap];
        listMap[val].id++;
      }
      
      this.setState({
        list:listMap
      })
    }
    render() {
      const {list} = this.state ;
      const banner = list.map(item=>{
        const imgs = item.children.map(it=>{
                      return <Image className='img' mode='widthFix'  src={it.url} key={it.id}></Image>
                    })
        return <SwiperItem className='recommend-item' key={item.id}>
                   {imgs}
               </SwiperItem>
      })
        return (
          <View className='recommend'>
            <View className='text'>为您推荐</View>
            <View className='swiper-container'>
              <Swiper
                ref='swiper'
                className='recommend-swiper'
                indicatorColor='#aaa'
                indicatorActiveColor='#47cab3'
                circular
                // indicatorDots
                // current={this.state.current}
                onChange={this.slideChange.bind(this)}
                autoplay
              >
                {banner}
              </Swiper>
              <View className='slide'>
                <View style={{'left':this.state.current*50+'rpx'}} className='move-block'></View>
              </View>
            </View>
          </View>        
        )
    }
}