import { useState, useEffect } from 'react';
import axios from 'axios';
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
        
        if (method === 'GET') {
          response = await axios.get(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}${endpoint}`, config);
        } else if (method === 'POST') {
          response = await axios.post(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}${endpoint}`, body, config);
        } else if (method === 'PUT') {
          response = await axios.put(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}${endpoint}`, body, config);
        } else if (method === 'DELETE') {
          response = await axios.delete(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}${endpoint}`, config);
        }

        setData(response?.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [...dependencies]);

  return { data, error, isLoading };
}