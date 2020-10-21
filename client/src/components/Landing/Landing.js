import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Input from '../common/Input';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

//Components
import Header from '../common/Header';

//Actions

class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />

        <View style={styles.body}>
          <Text>Landing</Text>
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

export default connect(mapStateToProps, null)(Landing);
