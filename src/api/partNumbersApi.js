import axios from 'axios';

const API_URL = 'https://www.softwarechidomx.com/api/PartNumbers';

export const getAll = () => axios.get(API_URL);
export const getById = id => axios.get(`${API_URL}/${id}`);
export const getByPN = pn => axios.get(`${API_URL}/by-pn/${pn}`);
export const create = data => axios.post(`${API_URL}/new/`, data);
export const update = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const remove = id => axios.delete(`${API_URL}/${id}`);