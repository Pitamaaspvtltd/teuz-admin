import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { assets } from "../assets/assets"
import Loader from "../components/Loader"

const AddProducts = () => {
	const [name, setName] = useState("")
	const [bg, setBg] = useState("")
	const [color, setColor] = useState("")
	const [category, setCategory] = useState("")
	const [subcategory, setSubcategory] = useState("")
	const [img, setImg] = useState(null)
	const [categories, setCategories] = useState([])
	const [subcategories, setSubcategories] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/categories")
			.then((response) => {
				setCategories(response.data.categories)
				console.log("Categories fetched:", response.data.categories)
			})
			.catch((error) => toast.error("Error fetching categories"))
	}, [])

	useEffect(() => {
		if (category) {
			axios
				.get(`http://localhost:5000/api/products/category/${category}`)
				.then((response) => {
					if (response.data.subcategories.length > 0) {
						setSubcategories(response.data.subcategories)
						console.log("Subcategories fetched:", response.data.subcategories)
					} else {
						toast.info("No subcategories found. Please create one.")
					}
				})
				.catch((error) => toast.error("Error fetching subcategories"))
		}
	}, [category])

	const handleSubmit = async (e) => {
		e.preventDefault()

		console.log(
			"Submitting with category:",
			category,
			"and subcategory:",
			subcategory
		)
		if (!name || !bg || !color || !category || !subcategory || !img) {
			toast.error("Please fill in all fields")
			return
		}

		const formData = new FormData()
		formData.append("name", name)
		formData.append("bg", bg)
		formData.append("color", color)
		formData.append("category", category)
		formData.append("subcategory", subcategory)
		formData.append("img", img)

		console.log("Form data being sent:", {
			name,
			bg,
			color,
			category,
			subcategory,
			img,
		})
		setLoading(true)
		try {
			const response = await axios.post(
				"http://localhost:5000/api/products",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)

			toast.success("Product added successfully")
			console.log("Product added:", response.data)
			// Reset form fields
			setName("")
			setBg("")
			setColor("")
			setCategory("")
			setSubcategory("")
			setImg(null)
		} catch (error) {
			toast.error(
				`Error adding product: ${
					error.response?.data?.message || error.message
				}`
			)
			console.error(
				"Error adding product:",
				error.response?.data || error.message
			)
		}
		setLoading(false)
	}

	return loading ? (
		<div className="grid place-items-center min-h-[80vh]">
			<div className="w-16  h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
		</div>
	) : (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl mb-4">Add Product</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						type="file"
						id="img"
						onChange={(e) => setImg(e.target.files[0])}
						hidden
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
					/>
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="img"
					>
						<img
							src={img ? URL.createObjectURL(img) : assets.upload_area}
							alt=""
							className="w-24 cursor-pointer"
						/>
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
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[600px]"
					/>
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
						value={bg}
						onChange={(e) => setBg(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[600px]"
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
						value={color}
						onChange={(e) => setColor(e.target.value)}
						// className=" border rounded  py-2 px-3 "
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
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[600px]"
					>
						<option value="">Select a category</option>
						{categories.map((cat) => (
							<option
								key={cat._id}
								value={cat._id}
							>
								{cat.name}
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
						value={subcategory}
						onChange={(e) => setSubcategory(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[600px]"
					>
						<option value="">Select a subcategory</option>
						{subcategories.map((sub) => (
							<option
								key={sub._id}
								value={sub._id}
							>
								{sub.name}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Add Product
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddProducts
