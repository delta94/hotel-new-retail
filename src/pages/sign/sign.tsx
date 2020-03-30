import Taro, { Component, Config} from '@tarojs/taro'
import { View ,Text,Picker} from '@tarojs/components'
import {AtForm,AtButton, AtInput} from 'taro-ui'

import './sign.scss'

import ChildrenList from '@/components/childrenList/children-list';


export default class Sign extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '家长注册',
  }
  constructor(props){
    super(props)
  }
  state = {
    sexOptions:[
        {
            label:'男',
            value:'0'
        },
        {
            label:'女',
            value:'1'
        }
    ],
    form:{
        name:'',
        mobile_no:'',
        short_name:'',
        emergency_mobile:'',
        sex:{label:'',value:''},
        area:[],
        detail_area:'',   
    },
    open:false
  }
  

  handleChange = (key,value)=>{
      this.setState((preState)=>{
        if(key==='sex'){
            preState.form[key] = preState.sexOptions[ value.detail.value];
        }else{
            preState.form[key] = value;
        }
       
      },()=>{
        console.log(this.state.form)
      })
      
      console.log(key)
      console.log(value)
      return value
  }

  handleChangeArae = (e)=>{
    console.log(e.detail.value)
    this.setState((preState)=>{
        preState.form.area = e.detail.value
    })
  }

  handleClickChildren = (value)=>{
      this.setState({
          open:value
      })
  }
  //新增孩子
  addChildren = ()=>{
    Taro.navigateTo({
        url:'/pages/child/child?type=add'
      })
  }

  submit = ()=>{
      console.log(this.state.form)
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
    return (
      <View className='sign'>
          <AtForm>
            <AtInput
              name='name'
              type='text'
              placeholder='姓名'
              value={this.state.form.name}
              onChange={this.handleChange.bind(this,'name')}
            />
            <AtInput
              name='mobile_no'
              type='phone'
              placeholder='手机号码'
              value={this.state.form.mobile_no}
              onChange={this.handleChange.bind(this,'mobile_no')}
            />
            <AtInput
              name='short_name'
              type='text'
              placeholder='称呼'
              value={this.state.form.short_name}
              onChange={this.handleChange.bind(this,'short_name')}
            />
            <AtInput
              name='emergency_mobile'
              type='phone'
              placeholder='紧急联系方式'
              value={this.state.form.emergency_mobile}
              onChange={this.handleChange.bind(this,'emergency_mobile')}
            />
            <Picker rangeKey='label' mode='selector' value={0} range={this.state.sexOptions} 
              onChange={this.handleChange.bind(this,'sex')}
            >
                <View>
                    <AtInput
                      name='sex'
                      type='text'
                      editable={false}
                      placeholder='性别'
                      value={this.state.form.sex.label}
                      onChange={()=>{}}
                    />
                </View>
            </Picker>
            <Picker  mode='region' value={this.state.form.area}  onChange={this.handleChangeArae.bind(this)}>
                <View>
                    <AtInput
                      name='area'
                      type='text'
                      editable={false}
                      placeholder='省市区'
                      value={this.state.form.area.join(' ')}
                      onChange={()=>{}}
                    />
                </View>
            </Picker>
            <AtInput
              name='detail_area'
              type='text'
              placeholder='详细地址,如街道、楼盘号等'
              value={this.state.form.detail_area}
              onChange={this.handleChange.bind(this,'detail_area')}
            />
        </AtForm>
        <ChildrenList></ChildrenList>
        {/* <View>
            <View className="at-row border-b pt-10 pb-10">
                <View className="at-col-10">
                    <View className="ml-32">孩子信息</View>
                </View>
                <View className="at-col-2 text-right">
                    <View onClick={this.addChildren.bind(this)} className="at-icon at-icon-add-circle mr-32"></View>
                </View>
            </View>
        </View> */}
        <View className='fixed fixed-b'>
            <AtButton className='border-radius-0' type='primary' onClick={this.submit.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}
