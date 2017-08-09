import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <label>Welcome! <strong>{this.props.user.name}</strong>({this.props.user.username})
      </label>
    );
  }
}

Welcome.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Welcome;
