import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api/v1" : "/api/v1",
    withCredentials: true, //send cookies in every req.
})

export default axiosInstance;