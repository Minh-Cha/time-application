import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onFetchData: () => void; // Function to call when the "Fetch Data" button is clicked
}
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '56px', // Match the default TextField height
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium', // Make sure the TextField size is set to medium
      },
    },
  },
});
const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange, onFetchData }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={4}>
            <ReactDatePicker
              selected={selectedDate}
              onChange={onDateChange}
              minDate={new Date()}
              dateFormat="yyyy/MM/dd"
              customInput={<TextField variant="outlined" />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={onFetchData}
            >
              Fetch Data
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DatePicker;


