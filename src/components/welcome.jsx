import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Welcome extends PureComponent {
  render() {
    return (
      <p>Welcome! <strong>{this.props.user.name}</strong>
        ({this.props.user.username})
      </p>
    );
  }
}

Welcome.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Welcome;
