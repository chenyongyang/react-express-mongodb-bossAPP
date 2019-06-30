import React, { Component } from 'react'

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile';

import { Redirect } from 'react-router-dom'

import Logo from '../../components/logo'

// 组件通过react-redux的connect来连接数据
import { connect } from 'react-redux'
// 导入登录action
import { login } from '../../redux/actions'

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange(name, val) {
        this.setState({
            [name]: val
        })
    }

    login = () => {
        this.props.login(this.state)
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

      render() {
        const { msg, redirectTo } = this.props.user
        if ( redirectTo === '/main' ) {
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>BOSS直聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        { msg ? <div className="error-msg">{ msg }</div> : null }
                        <WhiteSpace />
                        <InputItem placeholder="请输入用户名" onChange={val => { this.handleChange('username', val) }}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="请输入密码" type="password" onChange={val => { this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                       
                        <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    { login }
)(Login)