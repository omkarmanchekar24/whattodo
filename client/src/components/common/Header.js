import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import If from '../common/If';

class Header extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.title}>What To Do </Text>

        <If show={this.props.logout}>
          <IconButton
            icon="logout"
            size={20}
            onPress={() => this.props.onLogoutClick()}
          />
        </If>
      </View>
    );
  }
}

Header.defalutProps = {
  logout: false,
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
};

export default Header;
