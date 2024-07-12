// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { AiOutlineDelete } from "react-icons/ai"
// import { FaRegEdit } from "react-icons/fa"
// const CategoryList = () => {
// 	const [categories, setCategories] = useState([])

// 	useEffect(() => {
// 		axios
// 			.get("http://localhost:5000/api/categories")
// 			.then((response) => {
// 				setCategories(response.data.categories)
// 			})
// 			.catch((error) => {
// 				toast.error(error.message)
// 			})
// 	}, [])

// 	const handleDelete = (id) => {
// 		if (window.confirm("Are you sure you want to delete this category?")) {
// 			axios
// 				.delete(`http://localhost:5000/api/categories/${id}`)
// 				.then((response) => {
// 					toast.success("Category deleted successfully")
// 					setCategories(categories.filter((category) => category._id !== id))
// 				})
// 				.catch((error) => {
// 					toast.error(error.message)
// 				})
// 		}
// 	}

// 	return (
// 		<div className="container mx-auto p-4">
// 			<h1 className="text-2xl font-bold mb-4">Categories</h1>
// 			<ul className="space-y-2 max-w-[800px]">
// 				{categories.map((category) => (
// 					<li
// 						key={category._id}
// 						className="flex justify-between items-center bg-gray-100 p-2 rounded"
// 					>
// 						<span
// 							className="cursor-pointer"
// 							onClick={() =>
// 								(window.location.href = `/category/${category._id}`)
// 							}
// 						>
// 							{category.name}
// 						</span>
// 						<div className="space-x-4">
// 							<button
// 								onClick={() => handleEdit(category._id)}
// 								className="text-blue-500 text-xl	"
// 							>
// 								<FaRegEdit />
// 							</button>
// 							<button
// 								onClick={() => handleDelete(category._id)}
// 								className="text-red-500 text-2xl	"
// 							>
// 								<AiOutlineDelete />
// 							</button>
// 						</div>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	)
// }

// export default CategoryList

import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AiOutlineDelete } from "react-icons/ai"
import { FaRegEdit, FaSave } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { domainurl } from "../App"

const CategoryList = () => {
	const [categories, setCategories] = useState([])
	const [editingCategoryId, setEditingCategoryId] = useState(null)
	const [editingCategoryName, setEditingCategoryName] = useState("")

	useEffect(() => {
		axios
			.get(`${domainurl}/api/categories`)
			.then((response) => {
				setCategories(response.data.categories)
			})
			.catch((error) => {
				toast.error(error.message)
			})
	}, [])

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this category?")) {
			axios
				.delete(`${domainurl}/api/categories/${id}`)
				.then((response) => {
					toast.success("Category deleted successfully")
					setCategories(categories.filter((category) => category._id !== id))
				})
				.catch((error) => {
					toast.error(error.message)
				})
		}
	}

	const handleEdit = (id, name) => {
		setEditingCategoryId(id)
		setEditingCategoryName(name)
	}

	const handleSave = (id) => {
		axios
			.put(`${domainurl}/api/categories/${id}`, {
				name: editingCategoryName,
			})
			.then((response) => {
				toast.success("Category updated successfully")
				setCategories(
					categories.map((category) =>
						category._id === id
							? { ...category, name: editingCategoryName }
							: category
					)
				)
				setEditingCategoryId(null)
				setEditingCategoryName("")
			})
			.catch((error) => {
				toast.error(error.message)
			})
	}
	const navigate = useNavigate()

	return (
		<div className="container mx-auto p-4">
			<ToastContainer />

			<h1 className="text-2xl font-bold mb-4">Categories</h1>
			<ul className="space-y-2 max-w-[800px]">
				{categories.map((category) => (
					<li
						key={category._id}
						className="flex justify-between items-center bg-gray-100 p-2 rounded"
					>
						{editingCategoryId === category._id ? (
							<>
								<input
									type="text"
									value={editingCategoryName}
									onChange={(e) => setEditingCategoryName(e.target.value)}
									className="flex-1 p-2 border border-gray-300 rounded"
								/>
								<button
									onClick={() => handleSave(category._id)}
									className="text-green-500 text-xl ml-2"
								>
									<FaSave />
								</button>
							</>
						) : (
							<>
								<span
									className="cursor-pointer flex-1"
									onClick={() =>
										(window.location.href = `/category/${category._id}`)
									}
								>
									{category.name}
								</span>
								<div className="space-x-4">
									{/* <button
										onClick={() => handleEdit(category._id, category.name)}
										className="text-blue-500 text-xl"
									>
										<FaRegEdit />
									</button> */}
									<button
										onClick={() => handleDelete(category._id)}
										className="text-red-500 text-2xl"
									>
										<AiOutlineDelete />
									</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default CategoryList
