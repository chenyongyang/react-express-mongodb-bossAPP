// 老板信息的路由容器组件

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'

import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector'

import { updateUser } from '../../redux/actions'

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
        this.props.updateUser(this.state)
    }

    setHeader = (header) => {
        this.setState({
            header
        })
    }

    render() {
        /* 
            如果信息完善好了，应该跳转到别的页面
            这个页面跳转的实现思路：一切都以数据来驱动，信息完善完毕，说明header已经有值了
            那就可以在页面渲染最开始先判断header是否有值，有的话就跳转
        */
       // 如果信息已经完善，自动重定向对应的主界面
        const { type, header } = this.props.user
        if(header) { // 说明信息已经完善
            const path = type === 'staff' ? '/staff' : '/boss'
            return <Redirect to={path} />
        }
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
            user: state.user
        }
    },
    { updateUser }
)(BossInfo)