import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:8081/api/hello",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;