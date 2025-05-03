import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '@clerk/nextjs';

interface ApiDataOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  dependencies?: any[];
}

export function useApiData<T>({ endpoint, method = 'GET', body, dependencies = [] }: ApiDataOptions) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Get the user's API key from Clerk
        const token = await getToken();
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        let response;
        const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL || '';
        
        if (method === 'GET') {
          response = await axios.get(`${baseUrl}${endpoint}`, config);
        } else if (method === 'POST') {
          response = await axios.post(`${baseUrl}${endpoint}`, body, config);
        } else if (method === 'PUT') {
          response = await axios.put(`${baseUrl}${endpoint}`, body, config);
        } else if (method === 'DELETE') {
          response = await axios.delete(`${baseUrl}${endpoint}`, config);
        }

        setData(response?.data);
        setError(null);
      } catch (err) {
        const error = err as AxiosError;
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        setError(new Error(errorMessage));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have valid dependencies
    if (!dependencies.some(dep => dep === undefined || dep === null)) {
      fetchData();
    }
  }, [...dependencies]);

  return { data, error, isLoading, refetch: () => dependencies.forEach(() => {}) };
}