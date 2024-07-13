import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import "./login.css"
import { domainurl } from "../../App"

const Login = ({ setAuthenticated, url }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await axios.post(`${domainurl}/api/users/login`, {
				email,
				password,
			})
			if (response.data.success) {
				// Save token to localStorage
				localStorage.setItem("token", response.data.token)
				setAuthenticated(true)
				navigate("/")
				// toast.success("Login successful!")
			} else {
				// toast.error("Invalid credentials")
			}
		} catch (error) {
			console.error("Error logging in:", error)
			// toast.error("Error logging in. Please try again.")
		} finally {
			setLoading(false) // Set loading to false after the login attempt
		}
	}

	return (
		<div className="login-container">
			<div className="form-container">
				<p className="title">Login</p>
				<form
					className="form"
					onSubmit={handleSubmit}
				>
					<div className="input-group">
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-group">
						<label>Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						className="sign"
						type="submit"
					>
						{loading ? "Loading..." : "Sign in"}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
