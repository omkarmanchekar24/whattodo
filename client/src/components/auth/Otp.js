/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

//Components
import Header from '../common/Header';
import Input from '../common/Input';
import Button from '../common/Button';
import If from '../common/If';

//Actions
import {verify, resendToken} from '../../actions/authActions';

class Otp extends Component {
  state = {
    otp: '',
    loading: false,
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.loading === true) {
      return {
        loading: true,
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
      loading: false,
    });
  };

  handleNext = () => {
    const {otp} = this.state;
    const errors = {};

    if (otp.length === 0) errors.otp = 'Otp is required';

    if (Object.keys(errors).length > 0) {
      this.setState({errors});

      return;
    }

    this.props.verify(this.props.email, otp);
  };

  handleResend = () => {
    this.props.resendToken(this.props.email);
  };

  render() {
    const {loading, errors} = this.state;

    return (
      <View style={styles.container}>
        <Header style={{flex: 0.1}} />
        <View style={styles.body}>
          <View style={{alignItems: 'center'}}>
            <Text>We have sent you an otp on your email</Text>
            <Text>Please enter the otp to verify your email id</Text>
          </View>

          <Input
            placeholder="Otp"
            value={this.state.otp}
            style={{marginTop: 20}}
            name="otp"
            onChangeText={this.updateTextInput}
            disabled={loading}
            keyboardType="number-pad"
          />
          <If show={errors.otp}>
            <Text style={styles.errorText}>{errors.otp}</Text>
          </If>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Button
              text="Next"
              loading={loading}
              onPress={this.handleNext.bind(this)}
              style={styles.nextButton}
              disabled={loading}
            />
            <Button
              text="Resend"
              loading={this.props.resendLoading}
              onPress={this.handleResend.bind(this)}
              style={{
                ...styles.nextButton,
                backgroundColor: '#7b75eb',
              }}
              textStyle={{color: '#fff'}}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {flex: 1},
  body: {flex: 0.9, marginTop: 20, padding: 20},
  errorText: {
    fontSize: 12,
    color: 'red',
    marginLeft: 5,
  },
  nextButton: {
    alignSelf: 'center',
    width: 80,
    marginRight: 5,
  },
};

Otp.defaultProps = {
  email: 'gopalsjadhav309@gmail.com',
};

const mapStateToProps = (state) => {
  return {
    loading: state.otp.loading,
    resendLoading: state.otp.resendLoading,
    errors: state.otp.errors,
  };
};

export default connect(mapStateToProps, {verify, resendToken})(Otp);
