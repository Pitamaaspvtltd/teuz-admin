// import axios from "axios"
// import { url } from "../App"

// const axiosInstance = axios.create({
// 	baseURL: `${url}/api`,
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// 	withCredentials: true,
// })

// axiosInstance.interceptors.request.use((config) => {
// 	const token = localStorage.getItem("token")
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`
// 	}
// 	return config
// })

// export default axiosInstance
