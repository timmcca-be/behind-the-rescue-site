export type ErrorResponse = {
  message: string;
}

export class ApiError extends Error {
  constructor(public response?: ErrorResponse) {
    super(response?.message);
  }
}

export const apiRequest = async <T>(input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return await response.json() as T;
  } else {
    throw new ApiError(await response.json());
  }
}