import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

class Plan extends Component {
  constructor(props){
    super(props)
    console.log(props.location.state)
  }
  render() {
    return (
      <div>患者档案</div>
    );
  }
}

export default withRouter(Plan)