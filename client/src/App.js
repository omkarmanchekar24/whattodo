import React, {Component} from 'react';
import {Text, View} from 'react-native';

//Components
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
      <View>
        <Register />
      </View>
    );
  }
}

export default App;
