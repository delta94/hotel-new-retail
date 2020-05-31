import Taro ,{ Component }from '@tarojs/taro'
import { View,Image ,Text, ScrollView} from '@tarojs/components'
import './scrollX-view.scss'

interface propsType  {
  list: Array<any>,
  ratio: Number
}

export default class ScrollXView extends Component<propsType> {
    constructor(props){
        super(props)
    }
    static defaultProps = {
        list:[],
        ratio:3
    }
    state = {
      swiperH:''
    }

    clickCourse(item){
      Taro.navigateTo({
        url:`/pages/detail/detail?id=${item.id}`
      })
    }
    render(){
      const {list,ratio} = this.props ;
      const itemStyle = {
        width:`${ratio as any * 10 }%`
      }
      const courses = list.map((item)=>{
        return <View className="list-item" style={itemStyle} key="id" onClick={this.clickCourse.bind(this,item)}>
                  <Image className="img" mode="widthFix"  src={item.mainPictureUrl} ></Image>
                  <View className="desc">
                    <View className="name">{item.name}</View>
                    <View className="price-container">
                      <Text className={`price ${item.sale_price?"sale_price":''}`}>¥{item.price}</Text>
                      {item.sale_price && <Text className="discount_price">¥{item.sale_price}</Text>}
                    </View>
                  </View>
                </View>
      })
      return (
        <ScrollView scrollX className="list-container">
          {courses}
        </ScrollView>
      )

    }
}
