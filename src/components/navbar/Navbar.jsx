// import React from "react"
// import { useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import axios from "axios"

// const Navbar = () => {
// 	const navigate = useNavigate()

// 	const handleLogout = async () => {
// 		try {
// 			await axios.post(
// 				"http://localhost:5000/api/users/logout",
// 				{},
// 				{ withCredentials: true }
// 			)
// 			toast.success("Successfully logged out")
// 			navigate("/login")
// 		} catch (error) {
// 			toast.error("Error logging out")
// 			console.error("Error logging out:", error)
// 		}
// 	}

// 	return (
// 		<div className="navbar w-full flex justify-between border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg">
// 			<p
// 				className="cursor-pointer"
// 				onClick={() => navigate("/")}
// 			>
// 				HOME
// 			</p>
// 			<button
// 				className="text-red-500"
// 				onClick={handleLogout}
// 			>
// 				Logout
// 			</button>
// 		</div>
// 	)
// }

// export default Navbar

import React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import Cookies from "js-cookie"

const Navbar = ({ setAuthenticated }) => {
	const navigate = useNavigate()

	const handleLogout = () => {
		// Check if token exists in localStorage
		const token = localStorage.getItem("token")
		window.location.reload()
		if (!token) {
			// If token doesn't exist, do not perform logout
			return
		}

		// Clear token from localStorage
		localStorage.removeItem("token")
		// Set authenticated state to false
		setAuthenticated(false)
		// Show toast notification
		toast.success("Logout successful!")
		// Reload the page
	}

	return (
		<div className="navbar w-full flex justify-between border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg">
			<p
				className="cursor-pointer"
				onClick={() => navigate("/")}
			>
				HOME
			</p>
			<button
				className="text-red-500"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	)
}

export default Navbar
