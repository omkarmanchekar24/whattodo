import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import If from './If';
import moment from 'moment';

class DatePicker extends Component {
  // getValue = () => {
  //   if (this.props.mode === 'date') {
  //     return this.props.value.toString() === ''
  //       ? ''
  //       : moment(this.props.value.toString()).format('DD-MM-YYYY');
  //   }
  //   return this.props.value.toString() === ''
  //     ? ''
  //     : moment(this.props.value.toString()).format('hh:mm a');
  // };

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
            onChange={(event, seletedDate) => {
              if (seletedDate === undefined) {
                seletedDate = '';
              }
              onChange(name, seletedDate);
            }}
          />
        </If>
      </View>
    );
  }
}

export default DatePicker;
