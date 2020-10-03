import React from 'react';
import {View, TextInput} from 'react-native';

export default function Input({placeholder}) {
  return (
    <View>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
}

const styles = {
  input: {borderWidth: 0.5, borderRadius: 10, marginBottom: 20},
};
