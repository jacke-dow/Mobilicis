import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bmwMercedesUsers, setBmwMercedesUsers] = useState([]);
  const [highPriceMaleUsers, setHighPriceMaleUsers] = useState([]);
  const [quoteUsers, setQuoteUsers] = useState([]);
  const [luxuryCarUsers, setLuxuryCarUsers] = useState([]);
  const [topCities, setTopCities] = useState([]);

  useEffect(() => {
    fetch("/users/bmw-mercedes-users")
      .then((res) => res.json())
      .then((data) => setBmwMercedesUsers(data))
      .catch((err) => console.log(err));

    fetch("/users/high-price-male-users")
      .then((res) => res.json())
      .then((data) => setHighPriceMaleUsers(data))
      .catch((err) => console.log(err));

    fetch("/users/quote-users")
      .then((res) => res.json())
      .then((data) => setQuoteUsers(data))
      .catch((err) => console.log(err));

    fetch("/users/luxury-car-users")
      .then((res) => res.json())
      .then((data) => setLuxuryCarUsers(data))
      .catch((err) => console.log(err));

    fetch("/users/top-cities")
      .then((res) => res.json())
      .then((data) => setTopCities(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>BMW and Mercedes Users</h2>
      <ul>
        {bmwMercedesUsers.map((user) => (
          <li key={user._id}>
            {user.first_name} {user.last_name} ({user.email})
          </li>
        ))}
      </ul>

      <h2>High Price Male Users</h2>
      <ul>
        {highPriceMaleUsers.map((user) => (
          <li key={user._id}>
            {user.first_name} {user.last_name} ({user.email})
          </li>
        ))}
      </ul>

      <h2>Quote Users</h2>
      <ul>
        {quoteUsers.map((user) => (
          <li key={user._id}>
            {user.first_name} {user.last_name} ({user.email})
          </li>
        ))}
      </ul>

      <h2>Luxury Car Users</h2>
      <ul>
        {luxuryCarUsers.map((user) => (
          <li key={user._id}>
            {user.first_name} {user.last_name} ({user.email})
          </li>
        ))}
      </ul>

      <h2>Top Cities</h2>
      <ul>
        {topCities.map((city) => (
          <li key={city.city}>
            {city.city} ({city.avg_income})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
