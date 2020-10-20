import React from 'react';
import {View, TextInput} from 'react-native';

export default function Input({placeholder, style, onChangeText, name, value}) {
  return (
    <View>
      <TextInput
        keyboardType="email-address"
        style={[style, styles.input]}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(name, text)}
        value={value}
      />
    </View>
  );
}

const styles = {
  input: {borderWidth: 0.5, borderRadius: 10},
};
