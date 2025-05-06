import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const closeSidebar = () => {
        setShowSidebar(false)
    }

    return(
        <div
            style={{ zIndex: 9999 }}
            className={`${
                showSidebar ? "hidden" : "flex"
            } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed `}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link 
                    to="/InventoryDashboard" 
                    className={`flex items-center transition-transform transform hover:translate-x-2 ${location.pathname === '/' ? 'text-orange-500' : ''}`}
                >
                    <MdDashboard className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Dashboard</span>{" "}
                </Link>

                <Link 
                    to="/categoryList" 
                    className={`flex items-center transition-transform transform hover:translate-x-2 ${location.pathname === '/categoryList' ? 'text-orange-500' : ''}`}
                >
                    <TbCategoryPlus className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Add category</span>{" "}
                </Link>

                <Link 
                    to="/productList" 
                    className={`flex items-center transition-transform transform hover:translate-x-2 ${location.pathname === '/productList' ? 'text-orange-500' : ''}`}
                >
                    <IoIosAddCircle className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Add product</span>{" "}
                </Link>

                <Link 
                    to="/allProductList" 
                    className={`flex items-center transition-transform transform hover:translate-x-2 ${location.pathname === '/allProductList' ? 'text-orange-500' : ''}`}
                >
                    <MdInventory className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">View Inventory</span>{" "}
                </Link>
                
                <Link 
                    to="/suppliers" 
                    className={`flex items-center transition-transform transform hover:translate-x-2 ${location.pathname.includes('/supplier') ? 'text-orange-500' : ''}`}
                >
                    <FaUserTie className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Suppliers</span>{" "}
                </Link>
            </div>
        </div>
    )
}

export default Navigation