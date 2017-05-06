# React Dejank

Asynchronously loading components with conditional rendering can lead to a janky UI experience if you are not careful. React Dejank is a development utility for fixing this problem. You should not use React Dejank in production.

## Install

### NPM

```
npm install --save-dev react-dejank
```

### Yarn

```
yarn add --dev react-dejank
```

## Native

```javascript
// User.js

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import dejank from 'react-dejank';

const styles = StyleSheet.create({
  text: {
    fontSize: 18
  }
});

class User extends React.Component {

  constructor() {
    super();
    this.state = {
      user: {},
    }
  }

  componentWillMount() {
    this.fetchUser()
  }

  componentWillReceiveProps() {
    this.fetchUser()
  }

  // simulate a request
  fetchUser() {
    setTimeout(() => {
      this.setState({
        user: {
          name: this.props.username
        }
      })
    }, 2000)
  }

  render() {

    // add dejank to any existing conditional rendering.
    // the dejank prop will toggle between true and false on an interval.
    if (this.state.user.name && this.props.dejank) {
      return (
        <Text style={styles.text}>
          The username is {this.state.user.name}
        </Text>
      )
    } else {
      return null;
    }
  }
}

// The first argument is the component to dejank
// The second argument is an optional amount of time in milliseconds between updates
export default dejank(User, 3000);

```

```javascript
// App.js

import React from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import User from './User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -150
  },
  text: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
    padding: 5,
    borderRadius: 5,
  }
});

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      username: 'timurtu'
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <User username={this.state.username} />

        <TextInput
          style={styles.text}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
      </ScrollView>
    );
  }
}

```
