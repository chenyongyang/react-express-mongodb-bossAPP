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

import Logo from '../../components/logo'
import ListItem from 'antd-mobile/lib/list/ListItem';

export default class Register extends Component {
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
        console.log(this.state)
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const { type } = this.state
        return (
            <div>
                <NavBar>BOSS直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
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