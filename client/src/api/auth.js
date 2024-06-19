import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const requestPasswordResetRequest = (email) => {
  return axios.post(`/request-password-reset`, { email });
};

export const resetPasswordRequest = (token, newPassword) =>
  axios.post(`/reset-password/${token}`, { newPassword });

export const verifyTokenRequest = () => axios.get("/profile");
