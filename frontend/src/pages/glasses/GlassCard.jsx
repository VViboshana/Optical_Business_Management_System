import React from 'react'
import { FiShoppingCart} from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import {Link} from 'react-router-dom'

const GlassCard = ({glass}) => {
  return (
    <div className=" rounded-lg transition-shadow duration-300">
  <div
    className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
  >
    <div className="sm:h-36 sm:flex-shrink-0 border rounded-md">
      <Link to={`/glasses/${glass._id}`}>
        <img
          src={getImgUrl(glass?.coverImage)}
          alt={glass.title || "Glass Image"}
          className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
        />
      </Link>
    </div>

    <div>
      <Link to={`/glasses/${glass._id}`}>
      <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
          {glass.title}
        </h3>
        </Link>
      <p className="text-gray-600 mb-5">{glass.description.length>80 ? `${glass.description.slice(0,80)}...`:glass.description}</p>
      <p className="font-medium mb-5">
        ${glass?.newPrice} <span className="line-through font-normal ml-2">${glass?.oldPrice}</span>
      </p>
      <button className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
        <FiShoppingCart className="" />
        <span>Add to Cart</span>
      </button>
    </div>
  </div>
</div>
  )
}

export default GlassCard