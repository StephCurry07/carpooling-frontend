import { Stack, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';

const MuiDateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  // console.log({
  //   selectedDate,
  //   selectedTime: selectedTime && selectedTime.toLocaleTimeString()
  // });

  return (
    <Stack direction='column' spacing={1} sx={{}}>
      Date and Time: <br />
      <Stack direction="row" spacing={5} sx={{ width: '85%' }}>
        <DatePicker
          label='Date Picker'
          value={selectedDate}
          onChange={newValue => {
            setSelectedDate(newValue);
          }}
          textField={<TextField />}
        />
        <TimePicker
          label='Time Picker'
          value={selectedTime}
          onChange={newValue => {
            setSelectedTime(newValue);
          }}
          textField={<TextField />}
        />
      </Stack>
    </Stack>
  );
};

export default MuiDateTimePicker;
