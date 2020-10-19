import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
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
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={{height: 500, justifyContent: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Input placeholder="Name" />
            <Text style={styles.errorText}>Name is required</Text>
            <Input placeholder="Email" style={{marginTop: 20}} />
            <Text style={styles.errorText}>Email is required</Text>
            <Input placeholder="Password" style={{marginTop: 20}} />
            <Text style={styles.errorText}>Password is required</Text>
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
          </ScrollView>
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
    height: 350,
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
  registerButton: {marginTop: 20},
  loginButton: {
    borderWidth: 1,
    borderRadius: 5,
    width: 50,
    height: 20,
    marginTop: 10,
  },
};

export default Register;
