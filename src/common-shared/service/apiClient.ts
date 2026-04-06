import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/web';

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

const withRefreshLogic = async (requestFunction: () => Promise<any>) => {
  try {
    return await requestFunction();
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        await client.post('/refresh-token');
        
        return await requestFunction();
      } catch (refreshError) {
        window.location.href = '/login';
        throw refreshError;
      }
    }
    throw error;
  }
};

export const api = {

  get: (endpoint: string, queryParams?: Record<string, any>) => 
    withRefreshLogic(() => client.get(endpoint, { params: queryParams })),

  post: (endpoint: string, body?: any) => 
    withRefreshLogic(() => client.post(endpoint, body)),

  patch: (endpoint: string, body?: any) => 
    withRefreshLogic(() => client.patch(endpoint, body)),

  delete: (endpoint: string, body?: any) => 
    withRefreshLogic(() => client.delete(endpoint, { data: body }))
};