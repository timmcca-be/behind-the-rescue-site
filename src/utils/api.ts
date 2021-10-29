export type ErrorResponse = {
  message: string;
}

export class ApiError extends Error {
  constructor(public response?: ErrorResponse) {
    super(response?.message);
  }
}

const API_URL = process.env.REACT_APP_API_URL;

export const apiRequest = async <T>(path: string, init?: RequestInit) => {
  const response = await fetch(`${API_URL}${path}`, init);
  if (response.ok) {
    return await response.json() as T;
  } else {
    throw new ApiError(await response.json());
  }
}