import React, { Component } from 'react';
import * as io from 'socket.io-client';

class Chat extends Component {
  componentDidMount() {
    const socket = io.connect();
    socket.on('message', console.log);
  }

  render() {
    return (
      <label>Salim</label>
    );
  }
}

export default Chat;
