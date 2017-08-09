import PropTypes from 'prop-types';
import React, { Component } from 'react';

class UserCard extends Component {
  render() {
    return (
      <div>
        <img width={'64px'} height={'64px'} src={this.props.user.avatar} />
        <label>{this.props.user.username}</label>
      </div>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
