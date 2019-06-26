import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles/editor.less'

class Editor extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return (
      <div>formEditor</div>
    )
  }
}

export default withRouter(Editor)