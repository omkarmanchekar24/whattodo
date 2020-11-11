/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Card, Button, IconButton} from 'react-native-paper';
import Input from '../common/Input';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

//Components
import Header from '../common/Header';
import Task from '../common/Task';

//Actions
import {logout} from '../../actions/authActions';
import {getTasks} from '../../actions/taskActions';

class Landing extends Component {
  state = {
    tasks: null,
  };

  componentDidMount() {
    this.props.getTasks(this.props.auth.user.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.task.tasks) {
      return {
        tasks: props.task.tasks,
      };
    }
    return null;
  }

  render() {
    let data;
    if (this.state.tasks === null || this.props.task.loading === true) {
      data = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    } else if (this.state.tasks.length === 0) {
      data = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Please press the add button to add a task.</Text>
        </View>
      );
    } else {
      data = (
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}
          scrollEnabled={true}>
          {this.state.tasks.map((task) => (
            <Task
              title={task.text}
              todoAt={task.date}
              key={task._id}
              id={task._id}
            />
          ))}
        </ScrollView>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          logout={true}
          onLogoutClick={this.props.logout}
        />
        <View style={styles.body}>
          {data}

          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.addtask()}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
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
    padding: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 30,
  },
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    task: state.task,
  };
};

export default connect(mapStateToProps, {logout, getTasks})(Landing);
