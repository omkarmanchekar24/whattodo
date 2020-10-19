import React from 'react';
import {View, TextInput} from 'react-native';

export default function Input({placeholder, style}) {
  return (
    <View>
      <TextInput
        keyboardType="email-address"
        style={[style, styles.input]}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = {
  input: {borderWidth: 0.5, borderRadius: 10},
};
