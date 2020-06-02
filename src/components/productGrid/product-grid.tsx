import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image ,Swiper, SwiperItem,Text } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import './product-grid.scss';
interface propsType  {
  list: Array<any>,
}
export default class ProductGrid extends Component<propsType> {
    constructor(props){
        super(props)
    }

    clickCourse(item){
      Taro.navigateTo({
        url:`/pages/detail/detail?id=${item.id}`
      })
    }
    componentWillMount(){

    }
    render() {
        const {list} = this.props ;
        const courses = list.map((item)=>{
          return <View className="list-item" key={item.id} onClick={this.clickCourse.bind(this,item)}>
                    <Image className="img" mode="widthFix"  src={item.mainPictureUrl} ></Image>
                    <View className="desc">
                      {/* <View className="character">{item.character}</View> */}
                      <View className="name">{item.productName}</View>
                      <View className="price-container">
                        <Text className={`price ${item.sale_price?"sale_price":''}`}>¥{item.salePrice}</Text>
                        {item.sale_price && <Text className="discount_price">¥{item.sale_price}</Text>}
                        {/* {item.sale_price && <Text className="save_price">省{item.sale_price - item.price}元</Text>} */}
                      </View>
                    </View>
                 </View>
        })
        return (
            <View className="list-container">
              {courses}
            </View>
        )
    }
}
