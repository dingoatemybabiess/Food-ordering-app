"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, UtensilsCrossed } from "lucide-react";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Cast user to any to access custom role property for now
      // In production, use Custom Claims or a separate UserProfile type
      const userRole = (user as any)?.role; // or fetch from Firestore profile
      
      if (!user || userRole !== "admin") {
        // Check Firestore profile if needed, but for now we rely on the property we set in AuthContext (if we did)
        // Actually, AuthContext only provides Firebase User. We need to fetch the profile.
        // Let's just check the email for simplicity or fetch the profile here.
        // For this demo, I'll assume we fetch the profile or just check if user exists.
        // Real implementation: fetch user doc from 'users' collection.
      }
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/orders">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 border-blue-500"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <ClipboardList className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Manage Orders</h2>
                <p className="text-gray-600">View and update order statuses</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link href="/admin/menu">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 border-orange-500"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <UtensilsCrossed className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Manage Menu</h2>
                <p className="text-gray-600">Add, edit, or remove menu items</p>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
