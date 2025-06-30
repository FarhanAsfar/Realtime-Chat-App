import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api/v1",
    withCredentials: true, //send cookies in every req.
})

export default axiosInstance;