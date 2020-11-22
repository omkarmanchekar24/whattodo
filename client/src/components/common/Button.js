import React, {Component} from 'react';
import {Text, ActivityIndicator, TouchableOpacity} from 'react-native';

class Button extends Component {
  render() {
    const {text, loading, onPress, style, textStyle, disabled} = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => onPress()}
        disabled={disabled}>
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text style={textStyle}> {text} </Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    marginTop: 20,
    borderWidth: 0.5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
};

Button.defaultProps = {
  loading: false,
  disabled: false,
};

export default Button;
