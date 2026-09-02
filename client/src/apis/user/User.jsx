import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const apiRequest = (config) => {
  const token = localStorage.getItem('authToken');
  return axios({
    ...config,
    url: `${BASE_URL}${config.url}`,
    withCredentials: true,
    headers: token
      ? { ...config.headers, Authorization: `Bearer ${token}` }
      : config.headers,
  });
};

export const registerAPI = async (userData) => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: "/api/v1/users/register",
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginAPI = async (userData) => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: "/api/v1/users/login",
      data: {
        email: userData?.email,
        password: userData?.password,
      },
    });
    if (response.data?.token) localStorage.setItem('authToken', response.data.token);
    return response?.data;
  } catch (error) {
    console.error("Error in login :", error);
    throw error;
  }
};

export const checkUserAuthStatusAPI = async () => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: "/api/v1/users/auth/check",
    });
    return response?.data;
  } catch (error) {
    console.error("Error in user Authentication :", error);
    throw error;
  }
};

export const logoutAPI = async () => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: "/api/v1/users/logout",
      data: {},
    });
    localStorage.removeItem('authToken');
    return response?.data;
  } catch (error) {
    console.error("Error in logout :", error);
    throw error;
  }
};

export const getUserProfileAPI = async () => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: "/api/v1/users/profile",
    });
    return response?.data;
  } catch (error) {
    console.error("Error getting profile :", error);
    throw error;
  }
};
