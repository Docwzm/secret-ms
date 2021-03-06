import React, { Component } from 'react';
import { Icon } from 'antd'

class PageHeader extends Component {
    render() {
        const backIcon = () => {
            if (this.props.onBack) {
                return (<Icon
                    style={{ fontSize: "14px", verticalAlign: "middle", marginRight: "10px", paddingRight: "10px", borderRight: "1px solid #ccc", cursor: "point" }}
                    type="arrow-left"
                    onClick={this.props.onBack}
                />)
            } else {
                return null
            }
        }

        return (
            <div style={{ marginBottom: "20px", fontSize: "20px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
                <div style={{ float: 'left' }}>{backIcon()}</div>
                <span style={{ verticalAlign: "middle" }}>{this.props.title}</span>
                <div>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default PageHeader