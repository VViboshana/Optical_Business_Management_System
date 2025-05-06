import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import avatarImg from "../assets/avatar.png";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import axios from "axios";

const navigation = [
  //{ name: "Dashboard", href: "/glassDashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchSearchResults = async () => {
    if (searchTerm.trim() === "") {
      setShowResults(false);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/glasses?keyword=${searchTerm}`
      );
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetchSearchResults();
      } else {
        setShowResults(false);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const currentUser = true;
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <img src={logo} alt="logo" className="w-40 h-auto"></img>
          </Link>

          {/* Search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <form onSubmit={handleSearchSubmit}>
              <button type="submit">
                <IoIosSearch className="absolute inline-block left-3 inset-y-2" />
              </button>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search here"
                className="bg-[#dfdfdf] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
              ></input>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute bg-white white shadow-lg w-full mt-2 rounded-md">
                <ul>
                  {searchResults.map((glass) => (
                    <li
                      key={glass._id}
                      className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
                      onClick={() => {
                        navigate(`/glasses/${glass._id}`);
                        setShowResults(false);
                      }}
                    >
                      {glass.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* right div */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* Shpw drop down */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-400"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block ">
            <FaRegHeart className="size-6" />
          </button>

          <Link
            to="/cart"
            className="bg-primary rounded-md p-1 sm:px-6 px-2 flex items-center"
          >
            <FiShoppingCart className="text-black" />
            {cartItems.length > 0 ? (
              <span className="text-sm text-black front-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm text-black front-semibold sm:ml-1">
                0
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
