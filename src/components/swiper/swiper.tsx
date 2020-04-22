import Taro ,{ Component }from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem} from '@tarojs/components'

interface propsType  {
  list: Array<any>,
  config: Object
}

export default class SwiperList extends Component<propsType> {
    constructor(props){
        super(props)
    }
    state = {
      swiperH:''
    }
    onImgLoad(e){
      // const swiperHa = setSwiperHeight(e);
      // const winWid = Taro.getSystemInfoSync().windowWidth-20; //获取当前屏幕的宽度
      this.refs.swiper.boundingClientRect((rect)=> {
        const winWid = rect.width
        const imgh = e.detail.height;//图片高度
        const imgw = e.detail.width;//图片宽度
        const swiperH = winWid*imgh/imgw + "px" //
        this.setState({
          swiperH:swiperH//设置高度
        })
        console.log(rect.width)
      }).exec();

    }

    render(){
      let swiperConfig = {
        indicatorDots:true,
        autoplay:true,
        indicatorColor:'#aaa',
        indicatorActiveColor:'#47cab3',
        circular:true,
      }
      const {list=[],config = {} } = this.props
      swiperConfig = {...swiperConfig,...config}
      const {swiperH} = this.state
      const data = list.map(item=>{
        return <SwiperItem key={item.id}>
                  <Image style='width:100%;' onLoad={this.onImgLoad.bind(this)} mode='widthFix' src={item.imageUrl}></Image>
                </SwiperItem>
      })
      return (
        <Swiper
          ref='swiper'
          style={{height:swiperH}}
          className='test-h'
          indicatorColor={swiperConfig.indicatorColor}
          indicatorActiveColor={swiperConfig.indicatorActiveColor}
          circular={swiperConfig.circular}
          indicatorDots={swiperConfig.indicatorDots}
          autoplay={swiperConfig.autoplay}
        >
          {data}
        </Swiper>
      )
    }
}
