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

    return (
      <View style={styles.container} key={key}>
        <Card.Title
          title={title}
          subtitle={moment(todoAt).format('hh:mm a DD-MM-YYYY')}
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
