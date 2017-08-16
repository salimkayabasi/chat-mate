import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MessageBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.say = this.say.bind(this);
    this.state = {
      message: '',
    };
    this.divStyle = {
      width: '500px',
      background: '#dee',
      cursor: 'pointer',
    };
    this.myLineStyle = {
      textAlign: 'right',
    };
    this.yourLineStyle = {
      textAlign: 'left',
    };
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
    window.socket.emit('say', {
      to: this.props.user.id,
      message: this.state.message,
    });
    const user = this.props.user;
    user.history.push({
      fromName: 'me',
      createdAt: (new Date()).toISOString(),
      to: this.props.user.id,
      message: this.state.message,
    });
    this.setState({
      user,
    });

    this.setState({ message: '' });
  }

  render() {
    return (
      <div style={this.divStyle}>
        <label>{this.props.user && this.props.user.username}</label>
        <br/>
        {
          this.props.user.history && this.props.user.history.map((message, index) =>
            (<div key={index}
                  style={message.fromName === 'me' ? this.myLineStyle : this.yourLineStyle}>
                <strong>{message.fromName + ' ' + message.createdAt}</strong><br/>
                <label>{message.message}</label>
                <br/>
              </div>
            ),
          )
        }
        <br/>
        <input type="text" value={this.state.message} onChange={this.onMessageChange}/>
        <button onClick={this.say}>Say</button>
      </div>
    );
  }
}

MessageBox.propTypes = {
  user: PropTypes.object,
};

export default MessageBox;
