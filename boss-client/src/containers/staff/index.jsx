import React from 'react'
import { connect } from 'react-redux'

class Staff extends React.Component{
    render() {
        return (
            <div>Staff</div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Staff)