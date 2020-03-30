import Taro, { Component, Config} from '@tarojs/taro'
import { View ,Text,Picker} from '@tarojs/components'
import {AtForm,AtTextarea, AtInput} from 'taro-ui'
import './child.scss'


export default class Child extends Component {

  config: Config = {
    navigationBarTitleText: '新建孩子信息',
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
        school_name:'',
        age:'',
        grade:'',
        emergency_mobile:'',
        sex:{label:'',value:''},
        study_info:'',
        project:''
    },
  }
  

  handleChange = (key,value)=>{debugger
      let form = {...this.state.form}
      if(key==='sex'){
        form[key] = this.state.sexOptions[ value.detail.value];
      }else if(key==='study_info' || key==='project'){
        form[key] = value.target.value;
      }else{
        form[key] = value;
      }
      this.setState({
        form:form
      },()=>{
        console.log(this.state.form)
      })
      
      console.log(key)
      console.log(value)
  }

 

  submit = ()=>{
      console.log(this.state.form)
  }
 
  componentWillMount () { }

  componentDidMount () {
    console.log(this.$router.params)
    if(this.$router.params.type === 'edit'){
      Taro.setNavigationBarTitle({
        title:'编辑孩子信息'
      })
    }
    // console.log(this.conut)
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='child'>
          <AtForm>
            <AtInput
              name='name'
              type='text'
              title='姓名:'
              placeholder=''
              value={this.state.form.name}
              onChange={this.handleChange.bind(this,'name')}
            />
            <AtInput
              name='mobile_no'
              type='phone'
              title='手机号码:'
              placeholder=''
              value={this.state.form.mobile_no}
              onChange={this.handleChange.bind(this,'mobile_no')}
            />
            <AtInput
              name='age'
              type='phone'
              title='年龄:'
              placeholder=''
              value={this.state.form.age}
              onChange={this.handleChange.bind(this,'age')}
            />
            <Picker rangeKey='label' mode='selector' value={0} range={this.state.sexOptions} 
              onChange={this.handleChange.bind(this,'sex')}
            >
                <View>
                    <AtInput
                      name='sex'
                      type='text'
                      title='性别:'
                      editable={false}
                      placeholder=''
                      value={this.state.form.sex.label}
                      onChange={()=>{}}
                    />
                </View>
            </Picker>
            <AtInput
              name='school_name'
              type='text'
              title='所属学校:'
              placeholder=''
              value={this.state.form.school_name}
              onChange={this.handleChange.bind(this,'school_name')}
            />
            <AtInput
              name='grade'
              type='text'
              title='就读年级:'
              placeholder=''
              value={this.state.form.grade}
              onChange={this.handleChange.bind(this,'grade')}
            />
            <View className='text-area'>
              <View className='text-area-title'>学习近况:</View>
              <AtTextarea
                count={false}
                maxLength={200}
                value={this.state.form.study_info}
                onChange={this.handleChange.bind(this,'study_info')}
                placeholder=''
              />
              <View className='text-area-title'>期待进步的科目:</View>
              <AtTextarea
                count={false}
                maxLength={200}
                value={this.state.form.project}
                onChange={this.handleChange.bind(this,'project')}
                placeholder=''
              />
            </View>
            
        </AtForm>
        <View className='fixed fixed-b save-btn'>
            保存
        </View>
      </View>
    )
  }
}
