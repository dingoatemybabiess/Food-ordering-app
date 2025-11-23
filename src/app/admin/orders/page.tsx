"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/types";
import { motion } from "framer-motion";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">Order #{order.id.slice(0, 8)}</h3>
                <p className="text-sm text-gray-500">
                  {order.createdAt?.toLocaleString()} • {order.items.length} items
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Customer: {order.deliveryAddress}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                  className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md ${
                    order.status === 'pending' ? 'bg-yellow-50 text-yellow-800' :
                    order.status === 'preparing' ? 'bg-blue-50 text-blue-800' :
                    order.status === 'ready' ? 'bg-green-50 text-green-800' :
                    'bg-gray-50 text-gray-800'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
