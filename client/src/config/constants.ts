import { AxiosError } from "axios";

export const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL 
// custom type for api error
export interface MyApiError {
 message: string;
}
//configuration for headers
export const config = {
 headers: {
  "Content-Type": "application/json",
 },
 withCredentials: true,
 credentials: "include",
};

export const handleError = async (
 error: AxiosError<MyApiError>,
 rejectWithValue: (value: string | unknown) => string | unknown
) => {
 if (error.response && error.response.data.message) {
  return rejectWithValue(error.response.data.message);
 } else {
  return rejectWithValue(error.message);
 }
};