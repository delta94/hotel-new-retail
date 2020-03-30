import Taro, { Component} from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtButton,AtGrid,AtList ,AtListItem,AtCheckbox } from 'taro-ui'
import './children-list.scss'
import classNames from '../../../dist/npm/classnames';

export default class ChildrenList extends Component {

  constructor(props){
    super(props)
  }
  state = {
    childData:[
      {
        id:1,
        name:'陈星星',
        age:10,
        phone:'123456789',
        course:[],
        isShow:false
      },
      {
        id:2,
        name:'陈星星2',
        age:12,
        phone:'123456789',
        course:[],
        isShow:false
      }
    ],
    checkedList:[]
  }
  handleChange(value){
    this.setState({
      checkedList: value
    })
  }
  toggle(index){
    let childData = [...this.state.childData];
    let useItem = childData[index];
    useItem.isShow = !useItem.isShow;
    this.setState({
      childData: childData
    })
    
  }
  componentWillMount () { }

  componentDidMount () {
    // console.log(Taro)
    // console.log(this.conut)
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {childData,checkedList} = this.state;
    
    const childItem = childData.map((item,index)=>{
      const checkboxOption = [{
        value:item.id,
        label:'',
      }]
      return <View className='child-list-item' key={item.id}>
                <View className='check-box'>
                  <View className='check-box-container'>
                    <AtCheckbox 
                      options={checkboxOption}
                      selectedList={checkedList}
                      onChange={this.handleChange.bind(this)}
                    />
                  </View>
                </View>
                <View className='child-info'>
                  <View className='child-info-head'>
                    <View className='child-name'>{item.name}</View>
                    <View className='child-age'>{item.age}岁   {item.phone}</View>
                  </View>
                  <View className='child-toggle' onClick={this.toggle.bind(this,index)}>
                    已报课程
                    <View className={`at-icon ${item.isShow?'at-icon-chevron-up':'at-icon-chevron-down'}`} ></View>
                  </View>
                  { item.isShow ? 
                  <View className='child-course'>暂无数据</View>
                  :''
                  }
                </View>
             </View>
    })
    return (
      <View className='child-list'>
        {childItem}
      </View>
    )
  }
}
