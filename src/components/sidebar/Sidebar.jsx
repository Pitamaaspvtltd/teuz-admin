import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets"

const Sidebar = () => {
	return (
		<div className="bg-[#003a10] min-h-screen pl-[4vw]">
			<img
				src={assets.logo}
				alt="logo"
				className="mt-5 w-[max(10vw,100px)] hidden sm:block"
			/>
			<img
				src={assets.logo}
				alt=""
				className="mt-5 w-[max(4vw,40px)]  mr-5 sm:hidden block"
			/>
			<div className="flex flex-col gap-5 mt-10">
				<NavLink
					to={"/add-song"}
					className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00ff58] text-sm font-medium"
				>
					<img
						src={assets.add_Icon}
						className="w-5"
						alt=""
					/>
					<p className="hidden sm:block">Add Category</p>
				</NavLink>
				<NavLink
					to={"/list-song"}
					className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00ff58] text-sm font-medium"
				>
					<img
						src={assets.add_Icon}
						className="w-5"
						alt=""
					/>
					<p className="hidden sm:block">Add Product</p>
				</NavLink>
				<NavLink
					to={"/all-product"}
					className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00ff58] text-sm font-medium"
				>
					<img
						src={assets.list_icon}
						className="w-5"
						alt=""
					/>
					<p className="hidden sm:block">All Product</p>
				</NavLink>
				{/* <NavLink
					to={"/list-album"}
					className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00ff58] text-sm font-medium"
				>
					<img
						src={assets.album_icon}
						className="w-5"
						alt=""
					/>
					<p className="hidden sm:block">List Album</p>
				</NavLink> */}
			</div>
		</div>
	)
}

export default Sidebar
