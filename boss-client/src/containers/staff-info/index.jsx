// 大神信息的路由容器组件

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'

import HeaderSelector from '../../components/header-selector'

class StaffInfo extends Component {
    state = {
        header: '',
        post: '',
        info: ''
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    handleSava = () => {
        console.log(this.state)
    }

    setHeader = (header) => {
        this.setState({
            header
        })
    }

    render() {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder='请输入求职岗位' onChange={val => this.handleChange('post', val)}>求职岗位:</InputItem>
                <TextareaItem title="个人介绍:" rows={3} onChange={val => this.handleChange('info', val)} />
                <Button type="primary" onClick={this.handleSava}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            boss: state.boss
        }
    },
    {}
)(StaffInfo)