import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import moment from 'moment';

//Actions
import {deleteTask} from '../../actions/taskActions';

class Task extends Component {
  state = {
    status: 'unchecked',
  };

  render() {
    const {title, todoAt, key, id} = this.props;
    let today = moment();
    let tomorrow = moment().add(1, 'day');
    let date;

    if (moment(todoAt).isSame(today, 'day')) {
      date = `Today ${moment(todoAt).format('hh:mm a')}`;
    } else if (moment(todoAt).isSame(tomorrow, 'day')) {
      date = `Tomorrow ${moment(todoAt).format('hh:mm a')}`;
    } else {
      date = moment(todoAt).format('DD-MM-YYYY hh:mm a');
    }

    return (
      <View style={styles.container} key={key}>
        <Card.Title
          title={title}
          subtitle={date}
          right={(props) => (
            <RadioButton
              value="first"
              status={this.state.status}
              onPress={() => {
                // this.setState({
                //   status:
                //     this.state.status === 'unchecked' ? 'checked' : 'unchecked',
                // });
                this.props.deleteTask(id);
              }}
            />
          )}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
};

export default connect(null, {deleteTask})(Task);
