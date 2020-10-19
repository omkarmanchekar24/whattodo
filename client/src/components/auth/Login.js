import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Input from '../common/Input';
import {Actions} from 'react-native-router-flux';

//Components
import Header from '../common/Header';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />

        <View style={styles.body}>
          <Input placeholder="Username" />
          <Text style={styles.errorText}>Username is required</Text>
          <Input placeholder="Password" style={{marginTop: 20}} />
          <Text style={styles.errorText}>Password is required</Text>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.loginButton}
            color="#000">
            Sign In
          </Button>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Dont have an account? </Text>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => Actions.register()}>
              <Text style={{fontSize: 12, alignSelf: 'center'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
  },
  body: {
    flex: 0.9,
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'center',
    height: 300,
    width: 250,
  },

  text: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  loginButton: {marginTop: 20},
  registerButton: {
    borderWidth: 1,
    borderRadius: 5,
    width: 50,
    height: 20,
    marginTop: 10,
  },
};

export default Login;
