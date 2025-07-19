import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json"
  },
  transformRequest: [(data, headers) => {
    const access_token = sessionStorage.getItem('access_token');
    if (access_token) {
      headers.Authorization = "Bearer " + access_token;
    }

    // ✅ Automatically stringify if data is a plain object
    if (data && typeof data === 'object' && !(data instanceof FormData)) {
      return JSON.stringify(data);
    }

    return data;
  }],
  validateStatus: function (status) {
    if (window.location.pathname !== "/login") {
      if (status === 401) {
        window.location.assign("/login");
      }
      if (status === 404) {
        // window.location.assign("/dashboard");
      }
    }
    return (status >= 200 && status <= 204);
  }
});

export default axiosInstance;
