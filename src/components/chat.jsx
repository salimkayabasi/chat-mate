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
    if (!window.socket) {
      this.socket = io.connect();
      this.socket.on('users', (allUsers) => {
        const users = _.filter(allUsers, user => user.id !== this.props.user.id);
        this.setState({
          users,
        });
      });
      this.socket.on('message', (data) => {
        const users = this.state.users;
        const from = _.find(users, { id: data.from });
        if (from) {
          if (_.isUndefined(from.logs)) {
            from.logs = [];
          }
          from.logs.push(data.message);
          from.logs = _.takeRight(from.logs, 3);
        }
        this.setState({ users });
      });
      window.socket = this.socket;
    }
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
