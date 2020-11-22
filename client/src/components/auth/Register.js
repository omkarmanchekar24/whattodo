/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
//import {Button} from 'react-native-paper';
import Input from '../common/Input';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

//Components
import Header from '../common/Header';
import If from '../common/If';
import Button from '../common/Button';

//Actions
import {register} from '../../actions/authActions';

class Register extends Component {
  state = {
    name: 'Gopal',
    email: 'gopalsjadhav309@gmail.com',
    password: 'gggggg',
    loading: false,
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.loading === true) {
      return {
        loading: true,
        errors: {},
      };
    } else if (props.errors) {
      return {
        errors: props.errors,
        loading: false,
      };
    }
    return null;
  }

  updateTextInput = (prop, val) => {
    this.setState({
      [prop]: val,
      errors: {},
    });
  };

  handleRegister = () => {
    const {name, email, password} = this.state;
    const errors = {};

    if (name.length === 0) errors.name = 'Name is required';
    if (email.length === 0) errors.email = 'Email is required';
    if (password.length === 0) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      this.setState({errors});
      return;
    }

    this.props.register(name, email, password);
  };

  render() {
    const {errors, loading} = this.state;
    return (
      <View style={styles.container}>
        <Header style={styles.header} />

        <View style={styles.body}>
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={{height: 500, justifyContent: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Register</Text>
            <Input
              placeholder="Name"
              value={this.state.name}
              style={{marginTop: 20}}
              name="name"
              onChangeText={this.updateTextInput}
              disabled={loading}
            />
            <If show={errors.name}>
              <Text style={styles.errorText}>{errors.name}</Text>
            </If>

            <Input
              placeholder="Email"
              value={this.state.email}
              style={{marginTop: 20}}
              name="email"
              onChangeText={this.updateTextInput}
              disabled={loading}
            />
            <If show={errors.email}>
              <Text style={styles.errorText}>{errors.email}</Text>
            </If>

            <Input
              placeholder="Password"
              value={this.state.password}
              style={{marginTop: 20}}
              name="password"
              onChangeText={this.updateTextInput}
              disabled={loading}
            />
            <If show={errors.password}>
              <Text style={styles.errorText}>{errors.password}</Text>
            </If>
            <Button
              text="Sign Up"
              style={styles.registerButton}
              onPress={this.handleRegister}
              loading={loading}
              disabled={loading}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Already have an account? </Text>
              <Button
                text="Sign In"
                style={styles.loginButton}
                onPress={() => Actions.login()}
                textStyle={{fontSize: 12, alignSelf: 'center'}}
                disabled={loading}
              />
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
  },
  body: {
    flex: 0.9,
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'center',
    height: 350,
    width: 250,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    letterSpacing: 5,
    fontWeight: 'bold',
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
    padding: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    loading: state.register.loading,
    errors: state.register.errors,
  };
};

export default connect(mapStateToProps, {register})(Register);

// <Button
// mode="outlined"
// onPress={this.handleRegister}
// style={styles.registerButton}
// color="#000">
// Sign Up
// </Button>

// <TouchableOpacity
//                 style={styles.loginButton}
//                 onPress={() => Actions.login()}>
//                 <Text style={{fontSize: 12, alignSelf: 'center'}}>Sign In</Text>
//               </TouchableOpacity>
