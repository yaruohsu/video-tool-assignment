import type { ProcessVideoResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

export const transcriptApi = {
  processVideo: async (data: {
    videoFile: File;
    duration: number;
  }): Promise<ProcessVideoResponse> =>
    apiRequest<ProcessVideoResponse>('/video/process', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
