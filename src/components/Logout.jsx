// components/Logout.jsx
import React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Logout = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("token")
		toast.success("Logged out successfully")
		navigate("/login")
	}

	return <button onClick={handleLogout}>Logout</button>
}

export default Logout
