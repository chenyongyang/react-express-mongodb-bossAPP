import React, { Component } from 'react'

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile';

import { Redirect } from 'react-router-dom'

import Logo from '../../components/logo'
import ListItem from 'antd-mobile/lib/list/ListItem';

/* 
    直接在组件中导入后台提供的数据接口，这种做法是错误的
    因为数据接口是给redux用的，组件只能通过连接redux来对数据进行操作
*/
// 组件需要通过react-redux提供的connect组件来连接数据
import { connect } from 'react-redux'
// 同时如果组件想要对数据进行修改，那就要导入redux的action来操作
import { register } from '../../redux/actions'

class Register extends Component {
    state = {
        username: '',
        password: '',
        repassword: '',
        type: 'staff'
    }

    handleChange(name, val) {
        this.setState({
            [name]: val
        })
    }

    register = () => {
        /* 
            前台往后台发送ajax请求，触发了跨域，直接用CORS解决即可
        */
        this.props.register(this.state)
        /* 
            组件用redux的action来派发动作去改变state
            原本想要在组件中处理action的返回值，其实这种思路是不对的
            action的任务是改变state，而前台即使
        */
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const { type } = this.state
        const { msg, redirectTo } = this.props.user
        if (redirectTo === '/login') {
            return <Redirect to={ redirectTo } />
        }
        return (
            <div>
                <NavBar>BOSS直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        { msg ? <div className="error-msg">{ msg }</div> : null }
                        <WhiteSpace/>
                        <InputItem placeholder="请输入用户名" onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="请输入密码" type="password" onChange={val => { this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="请再次输入密码" type="password" onChange={val => { this.handleChange('repassword', val) }}>确认密码:</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio 
                                checked={type === 'boss'}
                                onChange={() => this.handleChange('type', 'boss')}>想招人</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio
                                checked={type === 'staff'}
                                onChange={() => this.handleChange('type', 'staff')}>找工作</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
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
    { register }
)(Register)