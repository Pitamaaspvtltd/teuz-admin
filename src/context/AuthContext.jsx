import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(
		JSON.parse(localStorage.getItem("userInfo")) || null
	)

	const setCredentials = (data) => {
		setUserInfo(data)
		localStorage.setItem("userInfo", JSON.stringify(data))
		const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days
		localStorage.setItem("expirationTime", expirationTime)
	}

	const logout = () => {
		setUserInfo(null)
		localStorage.clear()
	}

	return (
		<AuthContext.Provider value={{ userInfo, setCredentials, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
