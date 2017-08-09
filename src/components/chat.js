import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as io from 'socket.io-client';
import UserList from './chat/users';
import LogOut from './logout';
import Welcome from './welcome';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.socket = io.connect();
    this.socket.on('users', (allUsers) => {
      const users = _.filter(allUsers, user => user.id !== this.props.user.id);
      this.setState({
        users,
      });
    });
  }

  render() {
    return (
      <div>
        <Welcome user={this.props.user} /> <LogOut />
        <br />
        <UserList users={this.state.users} />
      </div>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Chat;
