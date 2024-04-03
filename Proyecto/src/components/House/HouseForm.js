import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HouseForm = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [rooms, setRooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api-colombia.com/api/v1/Department')
      .then(response => {
        setDepartments(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, city, state, zipCode, size, type, rooms, bathrooms, price, image });
    setAddress('');
    setCity('');
    setState('');
    setZipCode('');
    setSize('');
    setType('');
    setRooms('');
    setBathrooms('');
    setPrice('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
        <input
          id="address"
          type="text"
          className="form-input w-full"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      {/* Resto de campos de formulario */}
      {/* ... */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image (Optional)</label>
        <input
          id="image"
          type="file"
          className="form-input w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>

      {/* Mostrar lista de departamentos */}
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">List of Departments</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {departments.map(department => (
              <li key={department.id}>{department.name}</li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default HouseForm;