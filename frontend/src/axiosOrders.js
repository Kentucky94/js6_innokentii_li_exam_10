import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'http://localhost:8000'
});

export default axiosOrders;