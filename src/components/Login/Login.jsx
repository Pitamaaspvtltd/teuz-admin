import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import "./login.css"
import { domainurl } from "../../App"

const Login = ({ setAuthenticated, url }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
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
						Sign in
					</button>
				</form>
				{/* <div className="social-message">
				<div className="line"></div>
				<p className="message">Login with social accounts</p>
				<div className="line"></div>
			</div>

			<p className="signup">
				Don't have an account?
				<a
					rel="noopener noreferrer"
					href="#"
					className=""
				>
					Sign up
				</a>
			</p> */}
			</div>
		</div>
	)

	// <div>
	// 	<h2>Login</h2>
	// 	<form onSubmit={handleSubmit}>
	// 		<div>
	// 			<label>Email: </label>
	// 			<input
	// 				type="email"
	// 				value={email}
	// 				onChange={(e) => setEmail(e.target.value)}
	// 			/>
	// 		</div>
	// 		<div>
	// 			<label>Password: </label>
	// 			<input
	// 				type="password"
	// 				value={password}
	// 				onChange={(e) => setPassword(e.target.value)}
	// 			/>
	// 		</div>
	// 		<button type="submit">Login</button>
	// 	</form>
	// </div>
}

export default Login
