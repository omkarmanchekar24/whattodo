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
  disabled,
  keyboardType,
  secureTextEntry,
}) {
  return (
    <View>
      <TextInput
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={[style, styles.input]}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(name, text)}
        value={value}
        onFocus={onFocus}
        editable={editable}
        disabled={disabled}
      />
    </View>
  );
}

Input.defaultProps = {
  onFocus: () => {},
  editable: true,
  keyboardType: 'default',
  secureTextEntry: false,
};

const styles = {
  input: {borderWidth: 0.5, borderRadius: 10},
};
