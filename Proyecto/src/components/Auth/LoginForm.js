import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
    setEmail('');
    setPassword('');
  };

  const isEmailValid = (email) => {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Verifica si la contraseña tiene entre 8 y 20 caracteres
    return password.length >= 8 && password.length <= 20;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="email">
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-${isEmailValid(email) ? 'blue' : 'red'}-500`}
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isEmailValid(email) && <p className="text-red-500 text-xs italic">Please enter a valid email address.</p>}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-${isPasswordValid(password) ? 'blue' : 'red'}-500`}
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isPasswordValid(password) && <p className="text-red-500 text-xs italic">Password must be between 8 and 20 characters.</p>}
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={!isEmailValid(email) || !isPasswordValid(password)}
          >
            Log In
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;