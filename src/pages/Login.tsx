// src/pages/Login.tsx
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend auth
    alert('Login submitted');
  };

  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="mb-6 text-xl text-white font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-4 w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-4 w-full p-2 rounded bg-gray-700 text-white"
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
