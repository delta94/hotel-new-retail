import Taro, { Component, Config} from '@tarojs/taro'
import { View} from '@tarojs/components'
import {AtForm,AtButton, AtInput} from 'taro-ui'


export default class OrgSign extends Component {

  config: Config = {
    navigationBarTitleText: '机构注册',
  }
  constructor(props){
    super(props)
  }
  state = {
    form:{
        name:'',
        mobile_no:'',
        detail_area:'',   
    },
    open:false
  }
  

  handleChange = (key,value)=>{
      this.setState((preState)=>{
        preState.form[key] = value;
      },()=>{
        console.log(this.state.form)
      })
      
      console.log(key)
      console.log(value)
      return value
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
      <View className='orgSign'>
          <AtForm>
            <AtInput
            name='name'
            type='text'
            placeholder='机构名称'
            value={this.state.form.name}
            onChange={this.handleChange.bind(this,'name')}
            />
            <AtInput
                name='mobile_no'
                type='phone'
                placeholder='联系电话'
                value={this.state.form.mobile_no}
                onChange={this.handleChange.bind(this,'mobile_no')}
            />
            <AtInput
                name='detail_area'
                type='text'
                placeholder='机构地址'
                value={this.state.form.detail_area}
                onChange={this.handleChange.bind(this,'detail_area')}
            />
        </AtForm>
        <View className="fixed fixed-b">
            <AtButton className="border-radius-0" type='primary' onClick={this.submit.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}
