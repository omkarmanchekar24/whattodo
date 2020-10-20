import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Input from '../common/Input';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

//Components
import Header from '../common/Header';
import If from '../common/If';

//Actions
import {login} from '../../actions/authActions';

class Login extends Component {
  state = {
    email: 'omkarmanchekar.24@gmail.com',
    password: '444444',
    errors: {},
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors,
  //     });
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      return {
        errors: props.errors,
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

  handleLogin = () => {
    const {email, password} = this.state;
    const errors = {};

    if (email.length === 0) errors.email = 'Email is required';
    if (password.length === 0) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      this.setState({errors});
      return;
    }

    this.props.login(email, password);
  };

  render() {
    const {errors} = this.state;
    return (
      <View style={styles.container}>
        <Header style={styles.header} />

        <View style={styles.body}>
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={{height: 500, justifyContent: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Login</Text>

            <Input
              placeholder="Email"
              value={this.state.email}
              style={{marginTop: 20}}
              name="email"
              onChangeText={this.updateTextInput}
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
            />
            <If show={errors.password}>
              <Text style={styles.errorText}>{errors.password}</Text>
            </If>

            <Button
              mode="outlined"
              onPress={this.handleLogin}
              style={styles.loginButton}
              color="#000">
              Sign In
            </Button>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Don't have an account? </Text>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => Actions.register()}>
                <Text style={{fontSize: 12, alignSelf: 'center'}}>Sign Up</Text>
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
  loginButton: {marginTop: 20},
  registerButton: {
    borderWidth: 1,
    borderRadius: 5,
    width: 50,
    height: 20,
    marginTop: 10,
  },
};

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    errors: state.login.errors,
  };
};

export default connect(mapStateToProps, {login})(Login);
