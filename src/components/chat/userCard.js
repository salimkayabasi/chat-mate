import PropTypes from 'prop-types';
import React, { Component } from 'react';

class UserCard extends Component {
  render() {
    return (
      <div>
        <label>{this.props.user.name}</label>
      </div>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
