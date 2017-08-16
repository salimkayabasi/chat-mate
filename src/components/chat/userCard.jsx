import PropTypes from 'prop-types';
import React, { Component } from 'react';

class UserCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '',
    };
    this.getHistory = this.getHistory.bind(this);
    this.divStyle = {
      background: '#dfd',
      cursor: 'pointer',
    };
  }

  componentDidMount() {
    this.socket = window.socket;
  }

  getHistory() {
    this.socket.emit('history', {
      user: this.props.user.id,
    });
  }

  render() {
    return (
      <div onClick={this.getHistory} style={this.divStyle}>
        <img width={'64px'} height={'64px'} src={this.props.user.avatar}/>
        <label>{this.props.user.username}</label>
      </div>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
