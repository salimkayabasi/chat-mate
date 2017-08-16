import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as io from 'socket.io-client';
import MessageBox from './chat/messageBox';
import UserList from './chat/users';
import LogOut from './logout';
import Welcome from './welcome';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [],
      selectedUser: {},
    };
    this.divStyle = {
      float: 'left',
    }
  }

  componentDidMount() {
    if (!window.socket) {
      this.socket = io.connect();
      this.socket.on('users', (allUsers) => {
        const users = _.filter(allUsers, user => user.id !== this.props.user.id);
        this.setState({
          users,
          selectedUser: _.first(users),
        });
      });
      this.socket.on('message', (data) => {
        const users = this.state.users;
        const from = _.find(users, { id: data.from });
        if (from) {
          if (_.isUndefined(from.history)) {
            from.history = [];
          }
          from.history.push(data);
          from.history = _.sortBy(from.history, 'createdAt');
        }
        this.setState({ users });
      });
      this.socket.on('history', (data) => {
        const users = this.state.users;
        const user = _.find(users, { id: data.from });
        if (user) {
          if (_.isUndefined(user.history)) {
            user.history = [];
          }

          user.history = _.chain(data.history)
            .map((log) => {
              try {
                log.fromName = _.find(users, { id: log.from }).username
              } catch (e) {
                log.fromName = 'me';
              }
              return log;
            })
            .compact()
            .sortBy(data.history, 'createdAt')
            .value();
        }
        this.setState({ selectedUser: user });
      });
      window.socket = this.socket;
    }
  }

  render() {
    return (
      <div style={this.divStyle}>
        <Welcome user={this.props.user}/> <LogOut/>
        <br/>
        <UserList users={this.state.users}/>
        <MessageBox user={this.state.selectedUser}/>
      </div>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Chat;
