import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Input from '../common/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import moment from 'moment';

//Components
import Header from '../common/Header';
import If from '../common/If';

//Actions
import {addTask} from '../../actions/taskActions';

class AddTask extends Component {
  state = {
    name: '',
    todoAt: '',
    show: false,
    errors: {},
  };

  //   static getDerivedStateFromProps(props, state) {
  //     if (props.errors) {
  //       return {
  //         errors: props.errors,
  //       };
  //     }
  //     return null;
  //   }

  updateTextInput = (prop, val) => {
    if (prop === 'todoAt') {
      this.setState({
        [prop]: val,
        errors: {},
        show: false,
      });
      return;
    }
    this.setState({
      [prop]: val,
      errors: {},
    });
  };

  handleAdd = () => {
    const {name, todoAt} = this.state;
    const errors = {};
    if (name.length === 0) errors.name = 'Task name is required';
    if (todoAt.length === 0) errors.todoAt = 'Date and time is required';
    if (Object.keys(errors).length > 0) {
      this.setState({errors});
      return;
    }
    this.props.addTask(name, todoAt);
  };

  render() {
    const {name, todoAt, errors} = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Header style={styles.header} logout={true} />

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
            <TouchableOpacity onPress={() => this.setState({show: true})}>
              <Input
                placeholder="Date"
                value={
                  todoAt.toString() === ''
                    ? ''
                    : moment(todoAt.toString()).format('DD-MM-YYYY')
                }
                style={{marginTop: 20, color: 'black'}}
                name="todoAt"
                editable={false}
              />
            </TouchableOpacity>
            <If show={this.state.show}>
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={'date'}
                is24Hour={false}
                display="default"
                onChange={(event, seletedDate) =>
                  this.updateTextInput('todoAt', seletedDate)
                }
                onTouchCancel={() =>
                  this.setState({
                    show: false,
                  })
                }
              />
            </If>

            <If show={errors.todoAt}>
              <Text style={styles.errorText}>{errors.todoAt}</Text>
            </If>

            <Button
              mode="outlined"
              onPress={this.handleAdd}
              style={styles.addButton}
              color="#000">
              Add
            </Button>
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
    loading: state.login.loading,
    errors: state.login.errors,
  };
};

export default connect(mapStateToProps, null)(AddTask);