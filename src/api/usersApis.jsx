import axios from 'axios';

const API_URL = 'https://softwarechidomx.com/api/users';

export const getAllUsers = () => axios.get(`${API_URL}/getallusers`);
export const getUserById = id => axios.get(`${API_URL}/getbyid/${id}`);
export const getAllRoles = () => axios.get(`${API_URL}/getallrols`);
export const createUser = data => axios.post(`${API_URL}/new`, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/updateuser/${id}`, data);
export const deleteUser = id => axios.delete(`${API_URL}/deleteuser/${id}`);
export const updatePassword = (id, data) => axios.put(`${API_URL}/updatepassword/${id}`, data);
