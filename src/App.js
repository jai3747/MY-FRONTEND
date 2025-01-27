// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import axios from 'axios';
// // // // import './App.css';

// // // // // Simplified API URL configuration
// // // // const API_URL = process.env.REACT_APP_API_URL || 'http://34.100.172.207:5000/api';

// // // // function App() {
// // // //   const [name, setName] = useState('');
// // // //   const [email, setEmail] = useState('');
// // // //   const [message, setMessage] = useState('');
// // // //   const [users, setUsers] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(false);

// // // //   // Create axios instance with base configuration
// // // //   const api = axios.create({
// // // //     baseURL: API_URL,
// // // //     timeout: 10000
// // // //   });

// // // //   // Test connection and fetch initial users
// // // //   const initializeConnection = useCallback(async () => {
// // // //     try {
// // // //       // Test health endpoint
// // // //       await api.get('/health');
      
// // // //       // Fetch users
// // // //       const response = await api.get('/users');
// // // //       setUsers(response.data.data || []);
// // // //       setMessage(`Loaded ${response.data.count} users`);
// // // //     } catch (error) {
// // // //       setMessage(`Connection error: ${error.response?.data?.message || error.message}`);
// // // //     }
// // // //   }, []);

// // // //   // Trigger on component mount
// // // //   useEffect(() => {
// // // //     initializeConnection();
// // // //   }, [initializeConnection]);

// // // //   // Add user handler
// // // //   const addUser = async (e) => {
// // // //     e.preventDefault();

// // // //     try {
// // // //       setIsLoading(true);
// // // //       const response = await api.post('/users', { name, email });
      
// // // //       // Reset form and update users
// // // //       setName('');
// // // //       setEmail('');
      
// // // //       // Refetch users
// // // //       const updatedUsersResponse = await api.get('/users');
// // // //       setUsers(updatedUsersResponse.data.data || []);
      
// // // //       setMessage(`User ${response.data.data.name} added successfully`);
// // // //     } catch (error) {
// // // //       setMessage(`Add user error: ${error.response?.data?.message || error.message}`);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   // Delete user handler
// // // //   const deleteUser = async (userId) => {
// // // //     try {
// // // //       setIsLoading(true);
// // // //       await api.delete(`/users/${userId}`);
      
// // // //       // Refetch users after deletion
// // // //       const response = await api.get('/users');
// // // //       setUsers(response.data.data || []);
      
// // // //       setMessage('User deleted successfully');
// // // //     } catch (error) {
// // // //       setMessage(`Delete error: ${error.response?.data?.message || error.message}`);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="App">
// // // //       <h1>User Management App</h1>
      
// // // //       <div>
// // // //         <p>API URL: {API_URL}</p>
// // // //         <button onClick={initializeConnection}>Recheck Connection</button>
// // // //       </div>

// // // //       {message && <div className="message">{message}</div>}

// // // //       <form onSubmit={addUser}>
// // // //         <input 
// // // //           type="text" 
// // // //           placeholder="Name" 
// // // //           value={name} 
// // // //           onChange={(e) => setName(e.target.value)}
// // // //           required
// // // //           disabled={isLoading}
// // // //         />
// // // //         <input 
// // // //           type="email" 
// // // //           placeholder="Email" 
// // // //           value={email} 
// // // //           onChange={(e) => setEmail(e.target.value)}
// // // //           required
// // // //           disabled={isLoading}
// // // //         />
// // // //         <button type="submit" disabled={isLoading}>
// // // //           {isLoading ? 'Processing...' : 'Add User'}
// // // //         </button>
// // // //       </form>

// // // //       <div>
// // // //         <h2>Users ({users.length})</h2>
// // // //         {users.map(user => (
// // // //           <div key={user._id} className="user-item">
// // // //             <span>{user.name} - {user.email}</span>
// // // //             <button 
// // // //               onClick={() => deleteUser(user._id)}
// // // //               disabled={isLoading}
// // // //             >
// // // //               Delete
// // // //             </button>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import axios from 'axios';
// // // import './App.css';

// // // const API_URL = process.env.REACT_APP_API_URL || 'http://34.100.172.207:5000/api';

// // // function App() {
// // //   const [name, setName] = useState('');
// // //   const [email, setEmail] = useState('');
// // //   const [message, setMessage] = useState('');
// // //   const [users, setUsers] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   const api = axios.create({
// // //     baseURL: API_URL,
// // //     timeout: 10000
// // //   });

// // //   const initializeConnection = useCallback(async () => {
// // //     try {
// // //       await api.get('/health');
// // //       const response = await api.get('/users');
// // //       setUsers(response.data.data || []);
// // //       setMessage(`Loaded ${response.data.count} users`);
// // //     } catch (error) {
// // //       setMessage(`Connection error: ${error.response?.data?.message || error.message}`);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     initializeConnection();
// // //   }, [initializeConnection]);

// // //   const addUser = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       setIsLoading(true);
// // //       const response = await api.post('/users', { name, email });
      
// // //       setName('');
// // //       setEmail('');
      
// // //       const updatedUsersResponse = await api.get('/users');
// // //       setUsers(updatedUsersResponse.data.data || []);
      
// // //       setMessage(`User ${response.data.data.name} added successfully`);
// // //     } catch (error) {
// // //       setMessage(`Add user error: ${error.response?.data?.message || error.message}`);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const deleteUser = async (userId) => {
// // //     try {
// // //       setIsLoading(true);
// // //       await api.delete(`/users/${userId}`);
      
// // //       const response = await api.get('/users');
// // //       setUsers(response.data.data || []);
      
// // //       setMessage('User deleted successfully');
// // //     } catch (error) {
// // //       setMessage(`Delete error: ${error.response?.data?.message || error.message}`);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-4">
// // //       <h1 className="text-3xl font-bold mb-4">User Management App</h1>
      
// // //       <div className="mb-4">
// // //         <p className="text-gray-600">API URL: {API_URL}</p>
// // //         <button 
// // //           onClick={initializeConnection}
// // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //         >
// // //           Recheck Connection
// // //         </button>
// // //       </div>

// // //       {message && (
// // //         <div className="bg-gray-100 p-4 mb-4 rounded">
// // //           {message}
// // //         </div>
// // //       )}

// // //       <form onSubmit={addUser} className="mb-6">
// // //         <div className="mb-4">
// // //           <input
// // //             type="text"
// // //             placeholder="Name"
// // //             value={name}
// // //             onChange={(e) => setName(e.target.value)}
// // //             className="w-full p-2 border rounded"
// // //             required
// // //             disabled={isLoading}
// // //           />
// // //         </div>
// // //         <div className="mb-4">
// // //           <input
// // //             type="email"
// // //             placeholder="Email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             className="w-full p-2 border rounded"
// // //             required
// // //             disabled={isLoading}
// // //           />
// // //         </div>
// // //         <button
// // //           type="submit"
// // //           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// // //           disabled={isLoading}
// // //         >
// // //           {isLoading ? 'Processing...' : 'Add User'}
// // //         </button>
// // //       </form>

// // //       <div>
// // //         <h2 className="text-xl font-bold mb-4">Users ({users.length})</h2>
// // //         <div className="space-y-2">
// // //           {users.map(user => (
// // //             <div key={user._id} className="flex justify-between items-center bg-gray-50 p-4 rounded">
// // //               <span>{user.name} - {user.email}</span>
// // //               <button
// // //                 onClick={() => deleteUser(user._id)}
// // //                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// // //                 disabled={isLoading}
// // //               >
// // //                 Delete
// // //               </button>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import axios from 'axios';
// // import './App.css';

// // const API_URL = process.env.REACT_APP_API_URL || 'http://34.100.172.207:5000/api';

// // function App() {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [users, setUsers] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const api = axios.create({
// //     baseURL: API_URL,
// //     timeout: 15000,
// //     headers: {
// //       'Content-Type': 'application/json'
// //     }
// //   });

// //   const initializeConnection = useCallback(async () => {
// //     try {
// //       const healthCheck = await api.get('/health');
// //       console.log('Health check response:', healthCheck.data);
      
// //       const response = await api.get('/users');
// //       setUsers(response.data.data || []);
// //       setMessage(`Loaded ${response.data.count} users`);
// //     } catch (error) {
// //       console.error('Connection error:', error);
// //       setMessage(`Connection error: ${error.response?.data?.message || error.message}`);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     initializeConnection();
// //   }, [initializeConnection]);

// //   const addUser = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setIsLoading(true);
// //       const response = await api.post('/users', { name, email });
      
// //       setName('');
// //       setEmail('');
      
// //       const updatedUsersResponse = await api.get('/users');
// //       setUsers(updatedUsersResponse.data.data || []);
      
// //       setMessage(`User ${response.data.data.name} added successfully`);
// //     } catch (error) {
// //       console.error('Add user error:', error);
// //       setMessage(`Add user error: ${error.response?.data?.message || error.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const deleteUser = async (userId) => {
// //     try {
// //       setIsLoading(true);
// //       await api.delete(`/users/${userId}`);
      
// //       const response = await api.get('/users');
// //       setUsers(response.data.data || []);
      
// //       setMessage('User deleted successfully');
// //     } catch (error) {
// //       console.error('Delete error:', error);
// //       setMessage(`Delete error: ${error.response?.data?.message || error.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-3xl font-bold mb-4">User Management App</h1>
      
// //       <div className="mb-4">
// //         <p className="text-gray-600">API URL: {API_URL}</p>
// //         <button 
// //           onClick={initializeConnection}
// //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //         >
// //           Recheck Connection
// //         </button>
// //       </div>

// //       {message && (
// //         <div className="bg-gray-100 p-4 mb-4 rounded">
// //           {message}
// //         </div>
// //       )}

// //       <form onSubmit={addUser} className="mb-6">
// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             placeholder="Name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             required
// //             disabled={isLoading}
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             required
// //             disabled={isLoading}
// //           />
// //         </div>
// //         <button
// //           type="submit"
// //           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //           disabled={isLoading}
// //         >
// //           {isLoading ? 'Processing...' : 'Add User'}
// //         </button>
// //       </form>

// //       <div>
// //         <h2 className="text-xl font-bold mb-4">Users ({users.length})</h2>
// //         <div className="space-y-2">
// //           {users.map(user => (
// //             <div key={user._id} className="flex justify-between items-center bg-gray-50 p-4 rounded">
// //               <span>{user.name} - {user.email}</span>
// //               <button
// //                 onClick={() => deleteUser(user._id)}
// //                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// //                 disabled={isLoading}
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './App.css';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// function App() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

//   const api = axios.create({
//     baseURL: API_URL,
//     timeout: 15000,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   const initializeConnection = useCallback(async () => {
//     try {
//       setConnectionStatus('Checking connection...');
//       const healthCheck = await api.get('/health');
      
//       if (healthCheck.data.status === 'healthy') {
//         setConnectionStatus('Connected to server');
//         const response = await api.get('/users');
//         setUsers(response.data.data || []);
//         setMessage(`Connected successfully - Loaded ${response.data.count} users`);
//       }
//     } catch (error) {
//       console.error('Connection error:', error);
//       setConnectionStatus('Connection failed');
//       setMessage(`Connection error: ${error.response?.data?.message || error.message}`);
//     }
//   }, []);

//   useEffect(() => {
//     initializeConnection();

//     const intervalId = setInterval(initializeConnection, 30000); // Check connection every 30 seconds
//     return () => clearInterval(intervalId);
//   }, [initializeConnection]);

//   const addUser = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const response = await api.post('/users', { name, email });
      
//       setName('');
//       setEmail('');
      
//       const updatedUsersResponse = await api.get('/users');
//       setUsers(updatedUsersResponse.data.data || []);
      
//       setMessage(`User ${response.data.data.name} added successfully`);
//     } catch (error) {
//       console.error('Add user error:', error);
//       setMessage(`Add user error: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       setIsLoading(true);
//       await api.delete(`/users/${userId}`);
      
//       const response = await api.get('/users');
//       setUsers(response.data.data || []);
      
//       setMessage('User deleted successfully');
//     } catch (error) {
//       console.error('Delete error:', error);
//       setMessage(`Delete error: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">User Management App</h1>
      
//       <div className="mb-4">
//         <p className="text-gray-600">API URL: {API_URL}</p>
//         <p className="text-gray-600">Status: {connectionStatus}</p>
//         <button 
//           onClick={initializeConnection}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Refresh Connection
//         </button>
//       </div>

//       {message && (
//         <div className={`p-4 mb-4 rounded ${message.includes('error') ? 'bg-red-100' : 'bg-green-100'}`}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={addUser} className="mb-6">
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//             disabled={isLoading}
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//             disabled={isLoading}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Processing...' : 'Add User'}
//         </button>
//       </form>

//       <div>
//         <h2 className="text-xl font-bold mb-4">Users ({users.length})</h2>
//         <div className="space-y-2">
//           {users.map(user => (
//             <div key={user._id} className="flex justify-between items-center bg-gray-50 p-4 rounded">
//               <div>
//                 <p className="font-medium">{user.name}</p>
//                 <p className="text-gray-600">{user.email}</p>
//               </div>
//               <button
//                 onClick={() => deleteUser(user._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400"
//                 disabled={isLoading}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

// Support multiple API URLs for failover
const API_URLS = [
  'http://34.100.172.207:5000/api',
  'http://34.93.14.21/api'
];

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentApiUrl, setCurrentApiUrl] = useState(API_URLS[0]);
  const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

  const api = axios.create({
    baseURL: currentApiUrl,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const tryAllApiEndpoints = async () => {
    for (const apiUrl of API_URLS) {
      try {
        const response = await axios.get(`${apiUrl}/health`);
        if (response.data.status === 'healthy') {
          setCurrentApiUrl(apiUrl);
          setConnectionStatus(`Connected to ${apiUrl}`);
          return true;
        }
      } catch (error) {
        console.error(`Failed to connect to ${apiUrl}:`, error);
      }
    }
    setConnectionStatus('Failed to connect to any API endpoint');
    return false;
  };

  const initializeConnection = useCallback(async () => {
    try {
      setIsLoading(true);
      const connected = await tryAllApiEndpoints();
      
      if (connected) {
        const response = await axios.get(`${currentApiUrl}/users`);
        setUsers(response.data.data || []);
        setMessage(`Connected successfully - Loaded ${response.data.count} users`);
      } else {
        setMessage('Unable to connect to any API endpoint');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setMessage(`Connection error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [currentApiUrl]);

  useEffect(() => {
    initializeConnection();
    const intervalId = setInterval(initializeConnection, 30000);
    return () => clearInterval(intervalId);
  }, [initializeConnection]);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.post('/users', { name, email });
      
      setName('');
      setEmail('');
      
      const updatedUsersResponse = await api.get('/users');
      setUsers(updatedUsersResponse.data.data || []);
      
      setMessage(`User ${response.data.data.name} added successfully`);
    } catch (error) {
      console.error('Add user error:', error);
      setMessage(`Add user error: ${error.response?.data?.message || error.message}`);
      // Try to reconnect if we get an error
      initializeConnection();
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setIsLoading(true);
      await api.delete(`/users/${userId}`);
      
      const response = await api.get('/users');
      setUsers(response.data.data || []);
      
      setMessage('User deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      setMessage(`Delete error: ${error.response?.data?.message || error.message}`);
      // Try to reconnect if we get an error
      initializeConnection();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Management App</h1>
      
      <div className="mb-4">
        <p className="text-gray-600">Current API: {currentApiUrl}</p>
        <p className="text-gray-600">Status: {connectionStatus}</p>
        <button 
          onClick={initializeConnection}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Checking Connection...' : 'Refresh Connection'}
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('error') ? 'bg-red-100' : 'bg-green-100'}`}>
          {message}
        </div>
      )}

      <form onSubmit={addUser} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Add User'}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Users ({users.length})</h2>
        <div className="space-y-2">
          {users.map(user => (
            <div key={user._id} className="flex justify-between items-center bg-gray-50 p-4 rounded">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400"
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
