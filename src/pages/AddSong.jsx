// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import { toast } from "react-toastify"
// import { useNavigate } from "react-router-dom"
// import { domainurl } from "../App"

// const AddCategoryAndSubcategory = () => {
// 	const [categoryName, setCategoryName] = useState("")
// 	const [subcategoryName, setSubcategoryName] = useState("")
// 	const [category, setCategory] = useState("")
// 	const [categories, setCategories] = useState([])

// 	// Fetch categories on component mount
// 	useEffect(() => {
// 		const fetchCategories = async () => {
// 			try {
// 				const response = await axios.get(`${domainurl}/api/categories`)
// 				setCategories(response.data.categories)
// 			} catch (error) {
// 				toast.error("Failed to fetch categories", { autoClose: 3000 })
// 			}
// 		}
// 		fetchCategories()
// 	}, [])

// 	// Handle category form submission
// 	const handleCategorySubmit = async (e) => {
// 		e.preventDefault()

// 		try {
// 			const response = await axios.post(`${domainurl}/api/categories`, {
// 				name: categoryName,
// 			})
// 			toast.success(
// 				`Category ${response.data.category.name} created successfully!`,
// 				{ autoClose: 3000 }
// 			)
// 			setCategories([...categories, response.data.category]) // Update categories list
// 			setCategoryName("")
// 		} catch (error) {
// 			const errorMessage = error.response?.data.message || "An error occurred"
// 			toast.error(errorMessage, { autoClose: 3000 })
// 		}
// 	}

// 	// Handle subcategory form submission
// 	const handleSubcategorySubmit = async (e) => {
// 		e.preventDefault()

// 		try {
// 			const response = await axios.post(`${domainurl}/api/subcategories`, {
// 				name: subcategoryName,
// 				category,
// 			})
// 			toast.success(
// 				`Subcategory ${response.data.subcategory.name} created successfully!`,
// 				{ autoClose: 3000 }
// 			)
// 			setSubcategoryName("")
// 			setCategory("")
// 		} catch (error) {
// 			const errorMessage = error.response?.data.message || "An error occurred"
// 			toast.error(errorMessage, { autoClose: 3000 })
// 		}
// 	}

// 	return (
// 		<div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-xl">
// 			<h1 className="text-2xl font-bold mb-4">Add Category and Subcategory</h1>

// 			{/* Add Category Form */}
// 			<form
// 				onSubmit={handleCategorySubmit}
// 				className="space-y-4 mb-8"
// 			>
// 				<div>
// 					<label
// 						htmlFor="categoryName"
// 						className="block text-sm font-medium text-gray-700"
// 					>
// 						Category Name
// 					</label>
// 					<input
// 						type="text"
// 						id="categoryName"
// 						value={categoryName}
// 						onChange={(e) => setCategoryName(e.target.value)}
// 						required
// 						className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-medium text-md"
// 					/>
// 				</div>
// 				<button
// 					type="submit"
// 					className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
// 				>
// 					Add Category
// 				</button>
// 			</form>

// 			{/* Add Subcategory Form */}
// 			<form
// 				onSubmit={handleSubcategorySubmit}
// 				className="space-y-4"
// 			>
// 				<div>
// 					<label
// 						htmlFor="subcategoryName"
// 						className="block text-sm font-medium text-gray-700"
// 					>
// 						Subcategory Name
// 					</label>
// 					<input
// 						type="text"
// 						id="subcategoryName"
// 						value={subcategoryName}
// 						onChange={(e) => setSubcategoryName(e.target.value)}
// 						required
// 						className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-medium text-md"
// 					/>
// 				</div>
// 				<div>
// 					<label
// 						htmlFor="category"
// 						className="block text-sm font-medium text-gray-700"
// 					>
// 						Category
// 					</label>
// 					<select
// 						id="category"
// 						value={category}
// 						onChange={(e) => setCategory(e.target.value)}
// 						required
// 						className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-medium text-md"
// 					>
// 						<option value="">Select a category</option>
// 						{categories.map((cat) => (
// 							<option
// 								key={cat._id}
// 								value={cat.name}
// 							>
// 								{cat.name}
// 							</option>
// 						))}
// 					</select>
// 				</div>
// 				<button
// 					type="submit"
// 					className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
// 				>
// 					Add Subcategory
// 				</button>
// 			</form>
// 		</div>
// 	)
// }

// export default AddCategoryAndSubcategory

import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { domainurl } from "../App"

const AddCategoryAndSubcategory = () => {
	const [categoryName, setCategoryName] = useState("")
	const [subcategoryName, setSubcategoryName] = useState("")
	const [category, setCategory] = useState("")
	const [categories, setCategories] = useState([])
	const [categoryError, setCategoryError] = useState("")

	// Fetch categories on component mount
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(`${domainurl}/api/categories`)
				setCategories(response.data.categories)
			} catch (error) {
				toast.error("Failed to fetch categories", { autoClose: 3000 })
			}
		}
		fetchCategories()
	}, [])

	// Handle category form submission
	const handleCategorySubmit = async (e) => {
		e.preventDefault()

		try {
			// Check if the category name already exists
			const existingCategory = categories.find(
				(cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
			)

			if (existingCategory) {
				setCategoryError("Category already exists")
				setTimeout(() => {
					setCategoryError("")
				}, 3000) // Clear error message after 3 seconds
				return
			}

			// If not, proceed to create new category
			const response = await axios.post(`${domainurl}/api/categories`, {
				name: categoryName,
			})
			toast.success(
				`Category ${response.data.category.name} created successfully!`,
				{ autoClose: 3000 }
			)
			setCategories([...categories, response.data.category]) // Update categories list
			setCategoryName("")
			setCategoryError("")
		} catch (error) {
			const errorMessage = error.response?.data.message || "An error occurred"
			toast.error(errorMessage, { autoClose: 3000 })
		}
	}

	// Handle subcategory form submission
	const handleSubcategorySubmit = async (e) => {
		e.preventDefault()

		try {
			// Check if the subcategory name already exists
			const response = await axios.post(`${domainurl}/api/subcategories`, {
				name: subcategoryName,
				category,
			})
			toast.success(
				`Subcategory ${response.data.subcategory.name} created successfully!`,
				{ autoClose: 3000 }
			)
			setSubcategoryName("")
			setCategory("")
		} catch (error) {
			const errorMessage = error.response?.data.message || "An error occurred"
			toast.error(errorMessage, { autoClose: 3000 })
		}
	}

	return (
		<div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-xl">
			<h1 className="text-2xl font-bold mb-4">Add Category and Subcategory</h1>

			{/* Add Category Form */}
			<form
				onSubmit={handleCategorySubmit}
				className="space-y-4 mb-8"
			>
				<div>
					<label
						htmlFor="categoryName"
						className="block text-sm font-medium text-gray-700"
					>
						Category Name
					</label>
					<input
						type="text"
						id="categoryName"
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
						required
						className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-medium text-md"
					/>
					{categoryError && (
						<p className="text-red-500 text-sm mt-1">{categoryError}</p>
					)}
				</div>
				<button
					type="submit"
					className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
				>
					Add Category
				</button>
			</form>

			{/* Add Subcategory Form */}
			<form
				onSubmit={handleSubcategorySubmit}
				className="space-y-4"
			>
				<div>
					<label
						htmlFor="subcategoryName"
						className="block text-sm font-medium text-gray-700"
					>
						Subcategory Name
					</label>
					<input
						type="text"
						id="subcategoryName"
						value={subcategoryName}
						onChange={(e) => setSubcategoryName(e.target.value)}
						required
						className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-medium text-md"
					/>
				</div>
				<div>
					<label
						htmlFor="category"
						className="block text-sm font-medium text-gray-700"
					>
						Category
					</label>
					<select
						id="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
						className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-medium text-md"
					>
						<option value="">Select a category</option>
						{categories.map((cat) => (
							<option
								key={cat._id}
								value={cat.name}
							>
								{cat.name}
							</option>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
				>
					Add Subcategory
				</button>
			</form>
		</div>
	)
}

export default AddCategoryAndSubcategory
