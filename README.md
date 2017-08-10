# Chatmate

### Live Demo

Please check it out on [heroku](https://chat-mate.herokuapp.com/)

### Requirements
You should have installed:
- [Node.js][1] (tested on v6.11.0) //LTS version is recommended
- npm (tested on v3.10.10)
- [yarn][2] (tested on v0.27.5)


### Development

1. Clone the repository `$ git clone ...`
2. Install dependencies with `yarn`

Start server:

```bash
yarn watch # with live reload server
```

Client side:
    
```bash
yarn webpack # build client-side files
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Please check the `Configuration` section

### Linting with ESLint

[ESLint][3] is an open source JavaScript linting utility.

```bash
yarn lint # checking lint errors
yarn lint-fix # fixing minor lint errors
```

### Run tests

For tests we use [Jest][4]

To run test

```bash
yarn test
```


Before running test suites, it will check for lint errors. 
And it also print out coverage report after the test

### Docker Image

You can create a docker image with using built-in configuration

```bash
yarn docker
```
this command will create a new image with using `GIT_HASH` of current branch
* Docker must be installed if you want to use this feature

### Configuration
###### *(ENV variables)*

| name           | type    | required   | default           |variants           |
| ---------------|:--------|:-----------|:------------------|:------------------|
| NODE_ENV       | string  | optional   | development       | prod, qa, test    |
| GIT_HASH       | string  | optional   |                   |                   |
| PORT           | number  | optional   | 3000              |                   |
| LOG_LEVEL      | string  | optional   | debug             | info, warn...     |
| LOG_LAYOUT     | string  | optional   | basic             | colored...        |
| REDIS_URL      | string  | required   | redis://localhost |                   |
| COOKIE_SECRET  | string  | required   | keyboard cat      |                   |

[1]: https://nodejs.org/
[2]: https://yarnpkg.com/lang/en/
[3]: http://eslint.org/
[4]: https://facebook.github.io/jest/
