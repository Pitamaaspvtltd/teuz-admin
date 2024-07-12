// services/api.js
import axios from "axios"
import { domainurl } from "../App"

const API_URL = `${domainurl}/api
`
export const fetchCategoriesWithSubcategoriesAndProducts = async () => {
	try {
		const response = await axios.get(`${API_URL}/products/details`)
		return response.data.categories
	} catch (error) {
		console.error("Error fetching categories:", error)
		throw error
	}
}
