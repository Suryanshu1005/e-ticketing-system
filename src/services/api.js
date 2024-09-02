import axios from "axios";
import {getHeaders} from "../utils/getHeader";
const headers = getHeaders();

// Makes an API request using Axios with the specified HTTP method, URL, and optional data.
const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${process.env.REACT_APP_API_URL}${url}`,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response);
    throw error.response?.data || error;
  }
};

export default apiRequest;
