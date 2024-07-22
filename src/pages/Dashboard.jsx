// CategoryProductCount.js
import React, { useEffect, useState } from "react"
import axios from "axios"
import "tailwindcss/tailwind.css"
import { domainurl } from "../App"

const Dashboard = () => {
	const [data, setData] = useState(null)
	const [categoryCount, setCategoryCount] = useState(0)
	const [productCount, setProductCount] = useState(0)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${domainurl}/api/products/details`)
				setData(response.data)

				const categories = response.data.categories
				setCategoryCount(categories.length)

				let totalProducts = 0
				categories.forEach((category) => {
					category.subcategories.forEach((subcategory) => {
						totalProducts += subcategory.products.length
					})
				})
				setProductCount(totalProducts)
			} catch (error) {
				console.error("Error fetching data", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return <div className="text-center py-10">Loading...</div>
	}

	return (
		<div className="flex flex-col">
			<div className="">
				<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
				<div className="mb-2 bg-white shadow-md rounded px-8 py-6 my-6 w-80">
					<span className="text-gray-700  text-2xl font-semibold">
						Total Categories:
					</span>
					<span className="text-3xl ml-2 text-blue-600">{categoryCount}</span>
				</div>
				<div className="bg-white shadow-md rounded px-8 py-6 my-6 w-80">
					<span className="text-gray-700 font-semibold text-2xl ">
						Total Products:
					</span>
					<span className="ml-2 text-3xl  text-green-600">{productCount}</span>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
