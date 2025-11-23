"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export default function ReviewModal({ isOpen, onClose, order }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add review to 'reviews' collection
      await addDoc(collection(db, "reviews"), {
        orderId: order.id,
        userId: order.userId,
        rating,
        comment,
        createdAt: serverTimestamp(),
        items: order.items.map(i => i.id), // Link review to items
      });

      // Update average rating for each item in the order (Simplified: just incrementing count/sum)
      // In a real app, this should be a Cloud Function to avoid client-side complexity and security issues
      for (const item of order.items) {
        const itemRef = doc(db, "menuItems", item.id);
        // We need to read the current rating to update it correctly or use atomic increments if we store sum/count
        // Let's assume we store numRatings and totalRating on the item
        await updateDoc(itemRef, {
          numRatings: increment(1),
          totalRating: increment(rating),
        });
      }

      alert("Thank you for your review!");
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate your Order</h2>
            <p className="text-gray-600 mb-6">How was your food from Order #{order.id.slice(0, 8)}?</p>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`focus:outline-none transition-colors ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us what you liked..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
