import React, { Suspense, lazy, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Sidebar from "./components/sidebar/Sidebar"
import Navbar from "./components/navbar/Navbar"
import AddSong from "./pages/AddSong"
import Register from "./components/Register"
// import Login from "./components/Login"
import AddProducts from "./pages/AddProducts"
import { AuthProvider } from "./context/AuthContext"
import LoadingSpinner from "./components/LoadingSpinner.jsx" // Assuming you have a LoadingSpinner component
import ProductUpdate from "./pages/ProductUpdate.jsx"
import Login from "./components/Login/Login.jsx"
import ErrorBoundary from "./components/ErrorBoundary.jsx"

const CategoryList = lazy(() => import("./pages/CategoryList"))
const CategoryDetails = lazy(() => import("./pages/CategoryDetails"))

export const domainurl = "https://teuzbackend.onrender.com"

const App = () => {
	const navigate = useNavigate()
	const goBack = () => {
		navigate(-1) // This will take the user to the previous page
	}

	const [authenticated, setAuthenticated] = useState(
		localStorage.getItem("token") !== null
	)

	const PrivateRoute = ({ element, ...rest }) => {
		return authenticated ? (
			element
		) : (
			<Navigate
				to="/login"
				replace={true}
			/> // Navigate to login page if not authenticated
		)
	}

	return (
		<ErrorBoundary>
			<AuthProvider>
				<div className="flex items-start min-h-screen">
					<ToastContainer />
					{authenticated && <Sidebar />}
					<div className="flex-1 h-screen overflow-y-scroll bg-[#f3fff7]">
						{authenticated && <Navbar />}
						<div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
							<Suspense fallback={<LoadingSpinner />}>
								<Routes>
									<Route
										path="/login"
										element={<Login setAuthenticated={setAuthenticated} />}
									/>
									{/* <Route
									path="/register"
									element={<Register />}
								/> */}
									<Route
										path="/add-song"
										element={<PrivateRoute element={<AddSong />} />}
									/>
									<Route
										path="/list-song"
										element={<PrivateRoute element={<AddProducts />} />}
									/>
									<Route
										path="/"
										element={<PrivateRoute element={<CategoryList />} />}
									/>
									<Route
										path="/category/:id"
										element={
											<PrivateRoute
												element={<CategoryDetails back={goBack} />}
											/>
										}
									/>
									<Route
										path="/product/update/:id"
										element={<PrivateRoute element={<ProductUpdate />} />}
									/>
									<Route
										path="/"
										element={
											<Navigate
												to={authenticated ? "/" : "/login"}
												replace={true}
											/>
										}
									/>{" "}
								</Routes>
							</Suspense>
						</div>
					</div>
				</div>
			</AuthProvider>
		</ErrorBoundary>
	)
}

export default App
