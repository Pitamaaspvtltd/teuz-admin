// import React, { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import axios from "axios"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

// const ProductUpdate = () => {
// 	const { id } = useParams()
// 	const [product, setProduct] = useState({
// 		name: "",
// 		bg: "",
// 		color: "",
// 		category: "",
// 		subcategory: "",
// 		img: null,
// 	})
// 	const [categories, setCategories] = useState([])
// 	const [subcategories, setSubcategories] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const [imagePreview, setImagePreview] = useState(null)
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const [productRes, categoriesRes] = await Promise.all([
// 					axios.get(`http://localhost:5000/api/products/${id}`),
// 					axios.get("http://localhost:5000/api/categories"),
// 				])
// 				setProduct({
// 					...productRes.data,
// 					img: null,
// 				})
// 				setImagePreview(productRes.data.img)
// 				setCategories(categoriesRes.data.categories)
// 				setLoading(false)
// 			} catch (error) {
// 				toast.error(error.message)
// 				setLoading(false)
// 			}
// 		}
// 		fetchData()
// 	}, [id])

// 	useEffect(() => {
// 		if (product.category) {
// 			axios
// 				.get(`http://localhost:5000/api/products/category/${product.category}`)
// 				.then((response) => {
// 					setSubcategories(response.data.subcategories)
// 				})
// 				.catch((error) => toast.error("Error fetching subcategories"))
// 		}
// 	}, [product.category])

// 	const handleChange = (e) => {
// 		const { name, value, files } = e.target
// 		if (name === "img") {
// 			const selectedFile = files[0]
// 			if (selectedFile) {
// 				const objectUrl = URL.createObjectURL(selectedFile)
// 				setImagePreview(objectUrl)
// 				setProduct((prevProduct) => ({ ...prevProduct, img: selectedFile }))
// 			}
// 		} else {
// 			setProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
// 			if (name === "category") {
// 				axios
// 					.get(`http://localhost:5000/api/products/category/${value}`)
// 					.then((response) => {
// 						setSubcategories(response.data.subcategories)
// 						setProduct((prevProduct) => ({ ...prevProduct, subcategory: "" }))
// 					})
// 					.catch((error) => toast.error("Error fetching subcategories"))
// 			}
// 		}
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		const formData = new FormData()
// 		Object.keys(product).forEach((key) => {
// 			if (product[key]) {
// 				formData.append(key, product[key])
// 			}
// 		})
// 		try {
// 			const response = await axios.put(
// 				`http://localhost:5000/api/products/${id}`,
// 				formData,
// 				{
// 					headers: {
// 						"Content-Type": "multipart/form-data",
// 					},
// 				}
// 			)
// 			toast.success("Product updated successfully")
// 			navigate(`/category/${response.data.product.category}`)
// 		} catch (error) {
// 			toast.error(error.response?.data?.message || error.message)
// 		}
// 	}

// 	if (loading) {
// 		return <div>Loading...</div>
// 	}

// 	if (!product) {
// 		return <div>Product not found</div>
// 	}

// 	return (
// 		<div className="container mx-auto p-4 max-w-[800px]">
// 			<h1 className="text-2xl font-bold mb-4">Update Product</h1>
// 			<form onSubmit={handleSubmit}>
// 				<div className="mb-4">
// 					<input
// 						type="file"
// 						id="img"
// 						name="img"
// 						onChange={handleChange}
// 						hidden
// 						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 					/>
// 					<label
// 						className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
// 						htmlFor="img"
// 					>
// 						{imagePreview ? (
// 							<img
// 								src={imagePreview}
// 								alt=""
// 								className="w-24"
// 							/>
// 						) : (
// 							<span>Choose Image</span>
// 						)}
// 					</label>
// 				</div>
// 				<div className="mb-4">
// 					<label
// 						className="block text-gray-700 text-sm font-bold mb-2"
// 						htmlFor="name"
// 					>
// 						Name
// 					</label>
// 					<input
// 						type="text"
// 						id="name"
// 						name="name"
// 						value={product.name}
// 						onChange={handleChange}
// 						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 					/>
// 				</div>
// 				<div className="mb-4">
// 					<label
// 						className="block text-gray-700 text-sm font-bold mb-2"
// 						htmlFor="category"
// 					>
// 						Category
// 					</label>
// 					<select
// 						id="category"
// 						name="category"
// 						value={product.category}
// 						onChange={handleChange}
// 						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 					>
// 						<option value="">Select a category</option>
// 						{categories.map((category) => (
// 							<option
// 								key={category._id}
// 								value={category._id}
// 							>
// 								{category.name}
// 							</option>
// 						))}
// 					</select>
// 				</div>
// 				<div className="mb-4">
// 					<label
// 						className="block text-gray-700 text-sm font-bold mb-2"
// 						htmlFor="subcategory"
// 					>
// 						Subcategory
// 					</label>
// 					<select
// 						id="subcategory"
// 						name="subcategory"
// 						value={product.subcategory}
// 						onChange={handleChange}
// 						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 					>
// 						<option value="">Select a subcategory</option>
// 						{subcategories.map((subcategory) => (
// 							<option
// 								key={subcategory._id}
// 								value={subcategory._id}
// 							>
// 								{subcategory.name}
// 							</option>
// 						))}
// 					</select>
// 				</div>
// 				<div className="mb-4">
// 					<label
// 						className="block text-gray-700 text-sm font-bold mb-2"
// 						htmlFor="bg"
// 					>
// 						Background Color
// 					</label>
// 					<input
// 						type="text"
// 						id="bg"
// 						name="bg"
// 						value={product.bg}
// 						onChange={handleChange}
// 						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 					/>
// 				</div>
// 				<div className="mb-4">
// 					<label
// 						className="block text-gray-700 text-sm font-bold mb-2"
// 						htmlFor="color"
// 					>
// 						Color
// 					</label>
// 					<input
// 						type="color"
// 						id="color"
// 						name="color"
// 						value={product.color}
// 						onChange={handleChange}
// 						className=""
// 					/>
// 				</div>
// 				<div className="flex justify-end">
// 					<button
// 						type="button"
// 						onClick={() => navigate(-1)}
// 						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
// 					>
// 						Cancel
// 					</button>
// 					<button
// 						type="submit"
// 						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// 					>
// 						Save
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	)
// }

// export default ProductUpdate

import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { domainurl } from "../App"

const ProductUpdate = () => {
	const { id } = useParams()
	const [product, setProduct] = useState({
		name: "",
		bg: "",
		color: "",
		category: "",
		subcategory: "",
		img: null,
	})
	const [categories, setCategories] = useState([])
	const [subcategories, setSubcategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [imagePreview, setImagePreview] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [productRes, categoriesRes] = await Promise.all([
					axios.get(`${domainurl}/api/products/${id}`),
					axios.get(`${domainurl}/api/categories`),
				])
				setProduct({
					...productRes.data,
					img: null,
				})
				setImagePreview(productRes.data.img)
				setCategories(categoriesRes.data.categories)
				setLoading(false)
			} catch (error) {
				toast.error(error.message)
				setLoading(false)
			}
		}
		fetchData()
	}, [id])

	useEffect(() => {
		if (product.category) {
			axios
				.get(`${domainurl}/api/products/category/${product.category}`)
				.then((response) => {
					setSubcategories(response.data.subcategories)
				})
				.catch((error) => console.log("Error fetching subcategories"))
		}
	}, [product.category])

	const handleChange = (e) => {
		const { name, value, files } = e.target
		if (name === "img") {
			const selectedFile = files[0]
			if (selectedFile) {
				const objectUrl = URL.createObjectURL(selectedFile)
				setImagePreview(objectUrl)
				setProduct((prevProduct) => ({ ...prevProduct, img: selectedFile }))
			}
		} else {
			setProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
			if (name === "category") {
				axios
					.get(`${domainurl}/api/products/category/${value}`)
					.then((response) => {
						setSubcategories(response.data.subcategories)
						setProduct((prevProduct) => ({ ...prevProduct, subcategory: "" }))
					})
					.catch((error) => toast.error("Error fetching subcategories"))
			}
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		Object.keys(product).forEach((key) => {
			if (product[key]) {
				formData.append(key, product[key])
			}
		})
		try {
			const response = await axios.put(
				`${domainurl}/api/products/${id}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			toast.success("Product updated successfully")
			navigate(`/category/${response.data.product.category}`)
		} catch (error) {
			toast.error("Fill all categories")
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (!product) {
		return <div>Product not found</div>
	}

	return (
		<div className="container mx-auto p-4 max-w-[800px]">
			<h1 className="text-2xl font-bold mb-4">Update Product</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						type="file"
						id="img"
						name="img"
						onChange={handleChange}
						hidden
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
					<label
						className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
						htmlFor="img"
					>
						{imagePreview ? (
							<img
								src={imagePreview}
								alt=""
								className="w-24"
							/>
						) : (
							<span>Choose Image</span>
						)}
					</label>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={product.name}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="category"
					>
						Category
					</label>
					<select
						id="category"
						name="category"
						value={product.category}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option
								key={category._id}
								value={category._id}
							>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="subcategory"
					>
						Subcategory
					</label>
					<select
						id="subcategory"
						name="subcategory"
						value={product.subcategory}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="">Select a subcategory</option>
						{subcategories.length > 0 ? (
							subcategories.map((subcategory) => (
								<option
									key={subcategory._id}
									value={subcategory._id}
								>
									{subcategory.name}
								</option>
							))
						) : (
							<option disabled>No subcategories available</option>
						)}
					</select>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="bg"
					>
						Background Color
					</label>
					<input
						type="text"
						id="bg"
						name="bg"
						value={product.bg}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="color"
					>
						Color
					</label>
					<input
						type="color"
						id="color"
						name="color"
						value={product.color}
						onChange={handleChange}
						className=""
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}

export default ProductUpdate
