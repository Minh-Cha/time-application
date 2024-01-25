import React, { useState, useCallback, useMemo } from 'react';
import DateInput from './components/DateInput';
import { Grid, Box} from '@mui/material';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Function to handle date change
  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date);
  }, []);

  // Function to fetch data based on the selected date, fetching data from one day before
  const handleFetchData = useCallback(() => {
    if (selectedDate) {
      const prevDay = new Date(selectedDate);
      prevDay.setDate(prevDay.getDate() - 1);
      const formattedPrevDay = prevDay.toISOString().split('T')[0];
      const begin = `${formattedPrevDay}T00:00:00Z`;
      const end = `${formattedPrevDay}T23:59:59Z`;
    }
  }, [selectedDate]);

  return (
    <Box padding={10}>
      <Grid container spacing={5} direction="column">
        <Grid item>
          <DateInput selectedDate={selectedDate} onDateChange={handleDateChange} onFetchData={handleFetchData} />
        </Grid>
            <Grid item>
            </Grid>
            <Box my={4} />
            <Grid item>
              <Box >
              </Box>
            </Grid>
      </Grid>
    </Box>
  );
};

export default App;
