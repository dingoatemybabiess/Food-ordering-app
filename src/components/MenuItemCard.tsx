"use client";

import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 w-full">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Sold Out</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <span className="text-orange-600 font-bold">${item.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center mb-2">
           {/* Display Rating if available */}
           {(item as any).totalRating > 0 && (
             <div className="flex items-center text-yellow-500 text-xs mr-2">
               <span className="mr-1">★</span>
               <span>{((item as any).totalRating / (item as any).numRatings).toFixed(1)}</span>
               <span className="text-gray-400 ml-1">({(item as any).numRatings})</span>
             </div>
           )}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {item.category}
          </span>
          <button
            onClick={() => addToCart(item)}
            disabled={!item.available}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              item.available
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
