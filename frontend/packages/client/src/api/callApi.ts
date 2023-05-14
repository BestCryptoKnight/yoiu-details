/* eslint-disable @typescript-eslint/no-explicit-any */
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

const versionApi = '/api/';
const baseURL = process.env.REACT_APP_API_URL as string;

const apiURL = `${baseURL}${versionApi}`;

export class ApiError extends Error {
  status = 0;

  code = 0;

  constructor(message: string, status: number, code: number) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function* callApi(options: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint?: string;
  payload?: Record<string, any>;
}): SagaIterator {
  const {
    method = 'GET',
    endpoint,
    payload,
  } = options;

  const url = `${apiURL}${endpoint}`;

  const body = JSON.stringify(payload);

  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body,
  };

  const response: Response = yield call(fetch, url, requestOptions);

  const {
    status,
  } = response;

  let json: Record<string, any>;

  try {
    const unknowJson: any = yield call([response, response.json]);
    json = unknowJson;
  } catch (error) {
    json = {};
  }

  if (status >= 400) {
    const {
      code,
    } = json;

    const message = json.message ?? 'Request error';

    throw new ApiError(message, status, code);
  }

  return json;
}
