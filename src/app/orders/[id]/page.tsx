"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/types";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ChefHat, Truck, Package } from "lucide-react";
import ReviewModal from "@/components/ReviewModal";

const steps = [
  { status: "pending", label: "Order Placed", icon: Clock },
  { status: "preparing", label: "Preparing", icon: ChefHat },
  { status: "ready", label: "Ready for Pickup/Delivery", icon: Package },
  { status: "delivered", label: "Delivered", icon: Truck },
];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, "orders", id as string), (doc) => {
      if (doc.exists()) {
        setOrder({ id: doc.id, ...doc.data() } as Order);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!order) {
    return <div className="text-center py-12">Order not found</div>;
  }

  const currentStepIndex = steps.findIndex((s) => s.status === order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Status</h1>
        <p className="text-gray-500 mb-8">Order ID: {order.id}</p>

        {/* Progress Tracker */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-orange-600 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative z-10 flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.status} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                    } ${isCurrent ? "ring-4 ring-orange-200" : ""}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm font-medium ${isActive ? "text-orange-600" : "text-gray-500"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-gray-700">{item.quantity}x {item.name}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <p className="text-gray-600">{order.deliveryAddress}</p>
        </div>

        {order.status === "delivered" && (
          <div className="mt-8">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
            >
              Rate & Review Order
            </button>
          </div>
        )}
      </motion.div>

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        order={order}
      />
    </div>
  );
}
