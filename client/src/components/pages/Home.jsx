import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Backend Route: GET /restaurants
        const response = await api.get("/restaurants");
        setRestaurants(response.data);
        if (response.data.length === 0) {
          console.log("API EMPTY — using dummy data");
          setRestaurants([
            { restaurant_id: 1, name: "Burger King", cuisine: "Fast Food", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop" },
            { restaurant_id: 2, name: "Pizza Hut", cuisine: "Italian", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop" },
            { restaurant_id: 3, name: "Sushi World", cuisine: "Japanese", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop" },
          ]);
        }
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants. Please try again later.");
        
        // Fallback dummy data if backend is empty (so you see SOMETHING)
        setRestaurants([
            { restaurant_id: 1, name: "Burger King", cuisine: "Fast Food", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop" },
            { restaurant_id: 2, name: "Pizza Hut", cuisine: "Italian", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop" },
            { restaurant_id: 3, name: "Sushi World", cuisine: "Japanese", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-dark text-white text-center py-5 mb-4" style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
      }}>
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">Delicious Food Delivered</h1>
          <p className="lead fs-3 mb-4">Choose from the best restaurants in town</p>
          
          <div className="row justify-content-center">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill shadow-lg px-4 py-3"
                placeholder="Search for restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <h2 className="fw-bold mb-4">Restaurants</h2>
        {loading ? (
          <p className="text-center fs-4">Loading...</p>
        ) : (
          <div className="row">
            {filteredRestaurants.map((rest) => (
              <div key={rest.restaurant_id} className="col-md-4 mb-4">
                <Link to={`/restaurant/${rest.restaurant_id}`} className="text-decoration-none text-dark">
                  <div className="card shadow-lg border-0" style={{ borderRadius: "20px", overflow: "hidden", transition: "0.3s" }}>
                    <img
                      src={rest.image || "https://via.placeholder.com/400x220"}
                      alt={rest.name}
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h4 className="fw-bold">{rest.name}</h4>
                      <p className="text-muted">{rest.cuisine}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-danger text-center">{error}</p>}
      </div>
    </div>
  ); // <--- The return ends here

}; // <--- The function closes here

export default Home;