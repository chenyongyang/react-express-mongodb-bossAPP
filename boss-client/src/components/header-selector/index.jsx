// 选择用户头像的UI组件
import React, { Component } from 'react'

import { List, Grid } from 'antd-mobile'

import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        // 准备需要显示的列表数据
        this.headerList = []
        for(let i = 0; i < 20; i++){
            this.headerList.push({
                text: '头像'+(i+1),
                icon: require(`./images/头像${i+1}.jpg`)
            })
        }
    }

    render() {
        const listHeader = '请选择头像'
        return (
            <List renderHeader={() => listHeader}>
                <Grid
                    data={this.headerList}
                    columnNum={5}
                />
            </List>
        )
    }
}