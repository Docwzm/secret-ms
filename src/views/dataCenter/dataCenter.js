import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles/dataCenter.less'

class DataCenter extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return (
      <div>dataCenter</div>
    )
  }
}

export default withRouter(dataCenter)