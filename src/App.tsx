import React, { useState, useCallback, useMemo } from 'react';
import DateInput from './components/DateInput';
import LineGraph from './components/LineGraph';
import DataTable from './components/DataTable';
import useTimeSeriesData from './hooks/useTimeSeriesData';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { data, loading, error, fetchData } = useTimeSeriesData();

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
      fetchData(begin, end);
    }
  }, [selectedDate, fetchData]);

  // Process data to prepare for the line graph
  const lineGraphData = useMemo(() => {
    const labels = [];
    const dataPoints = [];
    const timestampPattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/;
    let position = 0;
    while (position < data.length) {
      const timestampStart = data.indexOf('2024-', position);
      const timestampEnd = data.indexOf(' ', timestampStart);
      const timestamp = data.substring(timestampStart, timestampEnd);
      const nextTimestampStart = data.indexOf('2024-', timestampEnd + 1);
      const valueEnd = nextTimestampStart !== -1 ? nextTimestampStart : data.length;
      const valueString = data.substring(timestampEnd + 1, valueEnd).trim();
      const value = parseFloat(valueString);
      if (timestampPattern.test(timestamp) && !isNaN(value)) {
        labels.push(timestamp);
        dataPoints.push(value);
      }
      position = valueEnd;
    }
    return {
      labels,
      datasets: [{ label: 'Your Dataset Label', data: dataPoints, borderColor: 'rgba(75,192,192,1)', backgroundColor: 'rgba(75,192,192,0.2)' }]
    };
  }, [data]);

  // Transform data for the data table
  const dataTableData = useMemo(() => lineGraphData.labels.map((label, index) => ({
    time: label,
    value: lineGraphData.datasets[0].data[index]
  })), [lineGraphData]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh" textAlign="center">
      <Typography color="error" variant="h6">Error fetching data: {error.message}</Typography>
    </Box>;
  }

  return (
    <Box padding={10}>
      <Grid container spacing={5} direction="column">
        <Grid item>
          <DateInput selectedDate={selectedDate} onDateChange={handleDateChange} onFetchData={handleFetchData} />
        </Grid>
        {data && (
          <>
            <Grid item>
              <LineGraph data={lineGraphData} />
            </Grid>
            <Box my={4} /> {/* Margin between Graph and Table */}
            <Grid item>
              <Box sx={{ maxHeight: { xs: '10vh', sm: '20vh', md: '30vh' }, overflow: 'auto' }}>
                <DataTable data={dataTableData} />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default App;
