import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Input from '../common/Input';
import {Actions} from 'react-native-router-flux';

//Components
import Header from '../common/Header';

class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />

        <View style={styles.body}>
          <View style={styles.registerContainer}>
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.registerButton}
              color="#000">
              Sign Up
            </Button>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Already have an account? </Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => Actions.login()}>
                <Text style={{fontSize: 12, alignSelf: 'center'}}>Sign In</Text>
              </TouchableOpacity>
            </View>
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
  body: {flex: 0.9, justifyContent: 'center'},
  registerContainer: {
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'center',
    height: 350,
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
  },
  registerButton: {},
  loginButton: {
    borderWidth: 1,
    borderRadius: 5,
    width: 50,
    height: 20,
    marginTop: 10,
  },
};

export default Register;
