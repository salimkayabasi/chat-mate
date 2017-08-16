import faker from 'faker';
import React from 'react';

class LoginBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  render() {
    return (
      <form action="/login" method="post">
        <div>
          <label htmlFor="email">Email:
            <input
              id="email"
              type="text"
              name="email"
              defaultValue={this.state.email}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">Password:
            <input
              id="password"
              type="password"
              name="password"
              defaultValue={this.state.password}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default LoginBox;
