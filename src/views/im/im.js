import React, {
  Component
} from 'react';
// import imService from './server';
import './im.scss'

import LeftSession from './components/leftSession'
import ChatBoard from './components/chatBoard'

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
    
  }
  render() {
    return (
      <div className="chat-im">
        <LeftSession></LeftSession>
        <ChatBoard></ChatBoard>
      </div>
    );
  }
}

export default Communicate