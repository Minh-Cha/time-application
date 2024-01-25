// src/hooks/useTimeSeriesData.ts
import { useState, useCallback } from 'react';
import axios from 'axios';

interface TimeSeriesDataItem {
  timestamp: string;
  value: number;
}

interface UseTimeSeriesDataReturnType {
  data: string;
  loading: boolean;
  error: Error | null;
  fetchData: (begin: string, end: string) => Promise<void>;
}

const useTimeSeriesData = (): UseTimeSeriesDataReturnType => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (begin: string, end: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://tsserv.tinkermode.dev/data?begin=${begin}&end=${end}`);
      setData(response.data); // Adjust according to the actual structure of your response
    } catch (error) {
      setError(error as Error);
    }
    setLoading(false);
  }, []);

  return { data, loading, error, fetchData };
};

export default useTimeSeriesData;
