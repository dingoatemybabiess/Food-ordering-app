import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/restaurants/${id}/items`);

        if (res.data.length === 0) {
          let dummyItems = [];
          if (id === "1") { // Burger King
            dummyItems = [
              { id: 1, restaurant_id: 1, name: "Classic Cheeseburger", description: "Juicy beef burger with cheese, lettuce, and tomato.", price: 5.99, image: "" },
              { id: 2, restaurant_id: 1, name: "Bacon Burger", description: "Burger with crispy bacon and cheddar cheese.", price: 6.99, image: "" },
              { id: 3, restaurant_id: 1, name: "Veggie Burger", description: "Grilled veggie patty with fresh toppings.", price: 5.49, image: "" },
            ];
          } else if (id === "2") { // Pizza Hut
            dummyItems = [
              { id: 4, restaurant_id: 2, name: "Pepperoni Pizza", description: "Classic pizza with pepperoni and mozzarella.", price: 9.99, image: "" },
              { id: 5, restaurant_id: 2, name: "Margherita Pizza", description: "Tomato, mozzarella, and fresh basil.", price: 8.99, image: "" },
              { id: 6, restaurant_id: 2, name: "BBQ Chicken Pizza", description: "Pizza with BBQ sauce, chicken, and onions.", price: 10.99, image: "" },
            ];
          } else if (id === "3") { // Sushi World
            dummyItems = [
              { id: 7, restaurant_id: 3, name: "California Roll", description: "Sushi roll with avocado, crab, and cucumber.", price: 12.99, image: "" },
              { id: 8, restaurant_id: 3, name: "Salmon Nigiri", description: "Fresh salmon over rice.", price: 14.99, image: "" },
              { id: 9, restaurant_id: 3, name: "Tuna Roll", description: "Tuna wrapped with rice and seaweed.", price: 13.99, image: "" },
            ];
          }

          setItems(dummyItems);
        } else {
          setItems(res.data);
        }

        const resRestaurants = await api.get("/restaurants");
        const restaurant = resRestaurants.data.find(
          (r) => r.restaurant_id == id || r.id == id
        );
        if (restaurant) setRestaurantName(restaurant.name);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  if (loading) return <p className="text-center fs-4 mt-5">Loading menu...</p>;
  if (error) return <p className="text-center fs-4 mt-5 text-danger">{error}</p>;

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4">{restaurantName} Menu</h1>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg rounded-pill shadow-sm px-4 py-2"
            placeholder="Search for dishes or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                transition: "0.3s",
              }}
            >
              <img
                src={item.image || "https://via.placeholder.com/400x220"} 
                alt={item.name}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h4 className="fw-bold">{item.name}</h4>
                <p className="text-muted">{item.description}</p>
                <p className="fw-bold">${item.price}</p>
                <button
                  className="btn btn-primary w-100 mt-2"
                  style={{ borderRadius: "12px" }}
                  onClick={() => alert(`${item.name} added to cart!`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <p className="text-center fs-5 mt-4">No items match your search.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
