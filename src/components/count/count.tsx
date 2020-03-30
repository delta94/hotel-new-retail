import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtButton } from 'taro-ui'

import {CounterContext} from '../createContext/counter-context'

export default class Count extends Component {
    static contextType = CounterContext
    constructor(props){
        super(props)
    }

    componentWillMount(){
        console.log(this.context)
    }
    render() {
        const count = this.context
        return (
            <View>
                Count :{count}
            </View>
        )
    }
}
