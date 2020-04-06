import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nsj49axw48.execute-api.us-east-2.amazonaws.com/Production'
});


const getIPInfo = (payload: string) => api.post(`/ipaddress`, payload);

export { getIPInfo };
