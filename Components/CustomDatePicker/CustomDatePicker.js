import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const CustomDatePicker = () => {
  return (
    <DatePicker
      mode="monthYear"
      selectorStartingYear={2000}
      onMonthYearChange={(selectedDate) => setDate(selectedDate)}
    />
  );
};
export default CustomDatePicker;
