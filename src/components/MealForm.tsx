import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const breakfastOptions = [
  { name: 'Pancakes', price: 5 },
  { name: 'Omelette', price: 6 },
  { name: 'Fruit Salad', price: 4 },
  { name: 'Cereal', price: 3 },
  { name: 'Toast', price: 2 }
];

const lunchOptions = [
  { name: 'Burger', price: 10 },
  { name: 'Salad', price: 8 },
  { name: 'Sandwich', price: 7 },
  { name: 'Pizza', price: 12 },
  { name: 'Pasta', price: 11 }
];

const dinnerOptions = [
  { name: 'Steak', price: 20 },
  { name: 'Chicken', price: 15 },
  { name: 'Fish', price: 18 },
  { name: 'Vegetables', price: 10 },
  { name: 'Rice', price: 9 }
];

const MealForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [breakfast, setBreakfast] = useState(breakfastOptions[0].name);
  const [lunch, setLunch] = useState(lunchOptions[0].name);
  const [dinner, setDinner] = useState(dinnerOptions[0].name);
  const [date, setDate] = useState(''); // New state for date
  const [totalCost, setTotalCost] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const calculateTotalCost = () => {
    const breakfastCost = breakfastOptions.find(item => item.name === breakfast)?.price || 0;
    const lunchCost = lunchOptions.find(item => item.name === lunch)?.price || 0;
    const dinnerCost = dinnerOptions.find(item => item.name === dinner)?.price || 0;
    setTotalCost(breakfastCost + lunchCost + dinnerCost);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateTotalCost();

    const data = {
      name,
      email,
      breakfast,
      lunch,
      dinner,
      date,
      totalCost
    };

    try {
      const token = localStorage.getItem('token'); 
      await axios.post('http://localhost:5000/submit', data, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      });

     
      setSubmitted(true);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('There was an error submitting the form');
    }
  };

  if (submitted) {
    return (
      <Navigate 
        to={`/submitted-data`} 
        state={{ data: { name, email, breakfast, lunch, dinner, date }, totalCost }} 
      />
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Meal Planner</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Breakfast</label>
          <select
            value={breakfast}
            onChange={(e) => setBreakfast(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {breakfastOptions.map((option, index) => (
              <option key={index} value={option.name}>{option.name} - ${option.price}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lunch</label>
          <select
            value={lunch}
            onChange={(e) => setLunch(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {lunchOptions.map((option, index) => (
              <option key={index} value={option.name}>{option.name} - ${option.price}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dinner</label>
          <select
            value={dinner}
            onChange={(e) => setDinner(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {dinnerOptions.map((option, index) => (
              <option key={index} value={option.name}>{option.name} - ${option.price}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
      {totalCost > 0 && (
        <div className="mt-4 text-lg font-bold">
          Total Cost: ${totalCost}
        </div>
      )}
    </div>
  );
};

export default MealForm;
