import PropTypes from 'prop-types';
import React, { Component } from 'react';

class UserCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '',
    };
    this.onMessageChange = this.onMessageChange.bind(this);
    this.say = this.say.bind(this);
    this.getHistory = this.getHistory.bind(this);
  }

  componentDidMount() {
    this.socket = window.socket;
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  getHistory() {
    this.socket.emit('history', {
      user: this.props.user.id,
    });
  }

  say() {
    this.socket.emit('say', {
      to: this.props.user.id,
      message: this.state.message,
    });
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <img width={'64px'} height={'64px'} src={this.props.user.avatar} />
        <br />
        <label onClick={this.getHistory}>{this.props.user.username}</label>
        <br />
        <input type="text" value={this.state.message} onChange={this.onMessageChange} />
        <button onClick={this.say}>Say</button>
        <br />
        {
          this.props.user.history && this.props.user.history.map((message, index) =>
            (<div key={index}>
              <label>{message.createdAt}</label>
              <label>{message.message}</label>
              <br />
            </div>
            ),
          )
        }
      </div>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
