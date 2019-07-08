import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

//希望在非路由组件中使用路由库的api withRouter()
class Footer extends React.Component{
    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    render() {
        let { navList } = this.props
        navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname // 请求的path
         return (
            <TabBar>
                {
                    navList.map(nav => (
                        <Item
                            key={nav.path}
                            title={nav.text}
                            icon={{uri: require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{ uri: require(`./images/${nav.icon}.png`) }}
                            selected={path === nav.path}
                            onPress={() => {
                                this.props.history.replace(nav.path)
                            }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(Footer) // 向外暴露由withrouter包装过的组件