// src/axiosConfig.js

import axios from "axios"

const instance = axios.create({
	baseURL: "https://teuzbackend.onrender.com", // Base URL for your backend
	withCredentials: true, // Include credentials with every request
})

export default instance
