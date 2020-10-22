import React from 'react';
import {View, TextInput} from 'react-native';

export default function Input({
  placeholder,
  style,
  onChangeText,
  name,
  value,
  onFocus,
  editable,
}) {
  return (
    <View>
      <TextInput
        keyboardType="email-address"
        style={[style, styles.input]}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(name, text)}
        value={value}
        onFocus={onFocus}
        editable={editable}
      />
    </View>
  );
}

Input.defaultProps = {
  onFocus: () => {},
  editable: true,
};

const styles = {
  input: {borderWidth: 0.5, borderRadius: 10},
};
