import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import LeftSession from './components/leftSession'
import ChatBoard from './components/chatBoard'

import './im.scss'

class Communicate extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  componentWillMount(){
    // imService.webimLogin()
  }
  componentDidMount(){
    let dom = ReactDOM.findDOMNode(this.refs['chat']);
    dom.style.height = document.body.clientHeight - 64 - 53 - 48 - 24 + 'px'
  }
  render() {
    return (
      <div className="chat-im" ref="chat">
        <LeftSession></LeftSession>
        <ChatBoard></ChatBoard>
      </div>
    );
  }
}

export default Communicate