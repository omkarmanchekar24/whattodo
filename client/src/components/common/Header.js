import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.title}>What to do </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
};

export default Header;
