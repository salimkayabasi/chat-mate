import React, { Component } from 'react';
import * as io from 'socket.io-client';
import UserList from './chat/users';

class Chat extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.socket = io.connect();
    this.socket.on('users', (users) => {
      this.setState({
        users,
      });
    });
  }

  render() {
    return (
      <div>
        <UserList users={this.state.users}></UserList>
      </div>
    );
  }
}

export default Chat;
