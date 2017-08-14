import PropTypes from 'prop-types';
import React, { Component } from 'react';
import UserCard from './userCard';

class UserList extends Component {

  constructor(props, context) {
    super(props, context);
    this.listStyle = {
      width: '300px',
    };
  }

  render() {
    return (
      <div style={this.listStyle}>
        <label>Connected Users: {this.props.users.length}</label>
        <br/>
        {this.props.users.map(user => <UserCard user={user} key={user.id}/>)}
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
