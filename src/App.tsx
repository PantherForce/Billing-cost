import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MealForm from './components/MealForm';
import SubmittedData from './components/SubmittedData';
import Signup from './components/SingUp';
import Login from './components/Login';

const App: React.FC = () => {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check-auth', { withCredentials: true });
        console.log(response.data.message);  // Handle success message
        setAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:',);  
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/logout', { withCredentials: true });
      console.log(response.data.message); 
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', );  
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="/submitted-data" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Submitted Data</a>
                    {!authenticated ? (
                      <>
                        <a href="/signup" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</a>
                        <a href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
                      </>
                    ) : (
                      <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={authenticated ? <MealForm /> : <Navigate to="/login" />} />
            <Route path="/submitted-data" element={<SubmittedData />} />
            <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated} />} />
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
            {/* Redirect to home if route not found */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
