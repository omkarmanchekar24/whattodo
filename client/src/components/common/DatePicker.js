import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import If from './If';

class DatePicker extends Component {
  render() {
    const {
      onPress,
      placeholder,
      value,
      style,
      name,
      show,
      mode,
      onChange,
      onTouchCancel,
    } = this.props;

    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <Input
            placeholder={placeholder}
            value={value}
            style={style}
            name={name}
            editable={false}
          />
        </TouchableOpacity>
        <If show={show}>
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={(event, seletedDate) => onChange(event, seletedDate)}
            onTouchCancel={onTouchCancel}
          />
        </If>
      </View>
    );
  }
}

export default DatePicker;
