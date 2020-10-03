import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Router from './src/Router';

//Components
import Login from './src/components/auth/Login';

class App extends Component {
  render() {
    return <Router />;
  }
}

export default App;
