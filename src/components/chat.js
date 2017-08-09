import React, { Component } from 'react';
import * as io from 'socket.io-client';
import UserList from './chat/users';
import LogOut from './logout';

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
        <LogOut />
        <UserList users={this.state.users} />
      </div>
    );
  }
}

export default Chat;
