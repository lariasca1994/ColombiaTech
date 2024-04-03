import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch houses
    axios.get('/api/houses')
      .then(response => {
        setHouses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching houses:', error);
        setLoading(false);
      });

    // Fetch departments
    axios.get('https://api-colombia.com/api/v1/Department')
      .then(response => {
        setDepartments(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">House List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {houses.map(house => (
            <div key={house.id} className="border rounded p-4">
              <h3 className="text-xl font-bold mb-2">{house.address}</h3>
              <p className="text-gray-600 mb-2">{house.city}, {house.state}, {house.zip_code}</p>
              <p className="text-gray-600 mb-2">{house.size} sqft</p>
              <p className="text-gray-600 mb-2">{house.rooms} rooms, {house.bathrooms} bathrooms</p>
              <p className="text-gray-600 mb-2">${house.price}</p>
              <img src={house.image} alt={`House ${house.id}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
      )}

      {/* Lista de departamentos */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">List of Departments</h2>
        <ul>
          {departments.map(department => (
            <li key={department.id}>{department.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HouseList;