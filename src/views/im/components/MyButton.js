import React, {
    Component
  } from 'react';
  import {Button} from 'antd'
  import { withRouter } from 'react-router-dom';
  
  class MyButton extends Component {
    constructor(props) {
      super(props)
      this.state = {
        show:false
      }
    }

    componentDidMount(){
      console.log(this.btnEl)
      console.log(this.props)
      // let keys = [1,2]
      // if(keys.findIndex(this.props.key)>=0){
      //   this.setState({
      //     show:true
      //   })
      // }
    }
    
    render() {
      return (
        this.state.show?<Button ref={(btnEl) => { this.btnEl = btnEl }} onClick={this.props.onClick} className={this.props.className}>{this.props.children}</Button>:null
      );
    }
  }
  
  export default withRouter(MyButton)
  