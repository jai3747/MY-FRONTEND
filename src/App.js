import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

// Simplified API URL configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://34.100.172.207:5000/api';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create axios instance with base configuration
  const api = axios.create({
    baseURL: API_URL,
    timeout: 10000
  });

  // Test connection and fetch initial users
  const initializeConnection = useCallback(async () => {
    try {
      // Test health endpoint
      await api.get('/health');
      
      // Fetch users
      const response = await api.get('/users');
      setUsers(response.data.data || []);
      setMessage(`Loaded ${response.data.count} users`);
    } catch (error) {
      setMessage(`Connection error: ${error.response?.data?.message || error.message}`);
    }
  }, []);

  // Trigger on component mount
  useEffect(() => {
    initializeConnection();
  }, [initializeConnection]);

  // Add user handler
  const addUser = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await api.post('/users', { name, email });
      
      // Reset form and update users
      setName('');
      setEmail('');
      
      // Refetch users
      const updatedUsersResponse = await api.get('/users');
      setUsers(updatedUsersResponse.data.data || []);
      
      setMessage(`User ${response.data.data.name} added successfully`);
    } catch (error) {
      setMessage(`Add user error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user handler
  const deleteUser = async (userId) => {
    try {
      setIsLoading(true);
      await api.delete(`/users/${userId}`);
      
      // Refetch users after deletion
      const response = await api.get('/users');
      setUsers(response.data.data || []);
      
      setMessage('User deleted successfully');
    } catch (error) {
      setMessage(`Delete error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>User Management App</h1>
      
      <div>
        <p>API URL: {API_URL}</p>
        <button onClick={initializeConnection}>Recheck Connection</button>
      </div>

      {message && <div className="message">{message}</div>}

      <form onSubmit={addUser}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Add User'}
        </button>
      </form>

      <div>
        <h2>Users ({users.length})</h2>
        {users.map(user => (
          <div key={user._id} className="user-item">
            <span>{user.name} - {user.email}</span>
            <button 
              onClick={() => deleteUser(user._id)}
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;