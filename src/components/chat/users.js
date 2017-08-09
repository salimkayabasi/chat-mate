import PropTypes from 'prop-types';
import React, { Component } from 'react';
import UserCard from './userCard';

class UserList extends Component {
  render() {
    return (
      <div>
        <label>Connected Users: {this.props.users.length}</label>
        <br />
        {this.props.users.map(user => <UserCard user={user} key={user.id} />)}
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
