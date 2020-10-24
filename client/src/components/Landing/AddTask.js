import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
//import {Button} from 'react-native-paper';
import Input from '../common/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import moment from 'moment';
import DatePicker from '../common/DatePicker';

//Components
import Header from '../common/Header';
import If from '../common/If';
import Button from '../common/Button';

//Actions
import {addTask} from '../../actions/taskActions';
import {logout} from '../../actions/authActions';

class AddTask extends Component {
  state = {
    name: '',
    todoAt: '',
    todoTime: '',
    showDatePicker: false,
    showTimePicker: false,
    loading: false,
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.task.loading === true) {
      return {
        loading: true,
      };
    } else if (props.errors) {
      return {
        errors: props.errors,
      };
    }
    return null;
  }

  updateTextInput = (prop, val) => {
    if (prop === 'todoAt') {
      let data = val === '' ? '' : moment(val).format('DD-MM-YYYY');

      this.setState({
        [prop]: data,
        errors: {},
        showDatePicker: false,
      });
      return;
    }
    if (prop === 'todoTime') {
      let data = val === '' ? '' : moment(val).format('hh:mm a');
      this.setState({
        [prop]: data,
        errors: {},
        showTimePicker: false,
      });
      return;
    }
    this.setState({
      [prop]: val,
      errors: {},
    });
  };

  handleAdd = () => {
    const {name, todoAt, todoTime} = this.state;
    const errors = {};
    if (name.length === 0) errors.name = 'Task name is required';
    if (todoAt.length === 0) errors.todoAt = 'Date is required';
    if (todoTime.length === 0) errors.todoTime = 'Time is required';
    if (Object.keys(errors).length > 0) {
      this.setState({errors});
      return;
    }
    let date = moment(`${todoAt} ${todoTime}`, 'DD-MM-YYYY hh:mm').format();
    let utcDate = moment.utc(date).format();

    this.props.addTask(this.props.auth.user.id, name, utcDate);
  };

  render() {
    const {
      name,
      todoAt,
      todoTime,
      errors,
      showDatePicker,
      showTimePicker,
      loading,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          logout={true}
          onLogoutClick={this.props.logout}
        />

        <View style={styles.body}>
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={{height: 500, justifyContent: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Add a Task</Text>

            <Input
              placeholder="Task Name"
              value={name}
              style={{marginTop: 20}}
              name="name"
              onChangeText={this.updateTextInput}
            />
            <If show={errors.name}>
              <Text style={styles.errorText}>{errors.name}</Text>
            </If>
            <DatePicker
              onPress={() => this.setState({showDatePicker: true})}
              placeholder="Date"
              value={todoAt}
              style={{marginTop: 20, color: 'black'}}
              name="todoAt"
              show={showDatePicker}
              mode="date"
              onChange={this.updateTextInput}
            />
            <If show={errors.todoAt}>
              <Text style={styles.errorText}>{errors.todoAt}</Text>
            </If>

            <DatePicker
              onPress={() => this.setState({showTimePicker: true})}
              placeholder="Time"
              value={todoTime}
              style={{marginTop: 20, color: 'black'}}
              name="todoTime"
              show={showTimePicker}
              mode="time"
              onChange={this.updateTextInput}
            />
            <If show={errors.todoTime}>
              <Text style={styles.errorText}>{errors.todoTime}</Text>
            </If>
            <Button
              text="Add"
              onPress={this.handleAdd}
              loading={loading}
              disabled={loading}
            />
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
  addButton: {marginTop: 20},
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    task: state.task,
  };
};

export default connect(mapStateToProps, {logout, addTask})(AddTask);

// <Button
//               mode="outlined"
//               onPress={this.handleAdd}
//               style={styles.addButton}
//               color="#000">
//               Add
//             </Button>
