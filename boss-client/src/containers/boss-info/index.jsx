// 老板信息的路由容器组件

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'

import HeaderSelector from '../../components/header-selector'

class BossInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
        company: '',
        salary: ''
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
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入招聘职位' onChange={val => this.handleChange('post', val)}>招聘职位:</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={val => this.handleChange('company', val)}>公司名称:</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={val => this.handleChange('salary', val)}>职位薪资:</InputItem>
                <TextareaItem title="职位要求:" rows={3} onChange={val => this.handleChange('info', val)}/>
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
)(BossInfo)