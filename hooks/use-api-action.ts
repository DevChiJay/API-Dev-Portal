import { useActionState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

// Base URL for the API
const API_BASE_URL = "http://localhost:5000";

type Method = "POST" | "PUT";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * A hook that provides an action function for API requests using React 19's useActionState.
 * @param endpoint The API endpoint to call
 * @param method The HTTP method to use
 * @returns An array containing [state, formAction, isPending]
 */
export function useApiAction<T>(
  endpoint: string, 
  method: Method = "POST",
  initialState: ApiResponse<T> = { data: null, error: null }
) {
  const { getToken } = useAuth();
  
  const apiAction = async (prevState: ApiResponse<T>, formData: FormData) => {
    try {
      const token = await getToken();
      const url = `${API_BASE_URL}${endpoint}`;
      
      // Convert FormData to a standard object
      const formObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Process special fields like numbers
      if (formObject.rateLimit) {
        formObject.rateLimit = parseInt(formObject.rateLimit as string, 10);
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      
      let response;
      if (method === "POST") {
        response = await axios.post(url, formObject, config);
      } else if (method === "PUT") {
        response = await axios.put(url, formObject, config);
      }

      return { data: response?.data, error: null };
    } catch (err) {
      console.error("API request failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Request failed";
      return { data: null, error: errorMessage };
    }
  };

  return useActionState(apiAction, initialState);
}
