// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import axios from 'axios';

// // // // Load API URLs from environment variables
// // // const API_URLS = process.env.REACT_APP_API_URL?.split(',').filter(Boolean) || [
// // //   'http://jc1.awsaparna123.xyz',
// // //   'http://jc1.awsaparns123.xyz/api'
// // // ];

// // // function App() {
// // //   const [name, setName] = useState('');
// // //   const [email, setEmail] = useState('');
// // //   const [message, setMessage] = useState('');
// // //   const [users, setUsers] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [currentApiUrl, setCurrentApiUrl] = useState('');
// // //   const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

// // //   // Create axios instance with dynamic base URL
// // //   const createApi = (baseURL) => axios.create({
// // //     baseURL,
// // //     timeout: 5000,
// // //     headers: {
// // //       'Content-Type': 'application/json'
// // //     }
// // //   });

// // //   const tryAllApiEndpoints = async () => {
// // //     for (const apiUrl of API_URLS) {
// // //       try {
// // //         const response = await axios.get(`${apiUrl}/api/health`, { timeout: 3000 });
// // //         if (response.data.status === 'healthy') {
// // //           setCurrentApiUrl(apiUrl);
// // //           setConnectionStatus(`Connected to ${apiUrl}`);
// // //           return apiUrl;
// // //         }
// // //       } catch (error) {
// // //         console.error(`Failed to connect to ${apiUrl}:`, error);
// // //       }
// // //     }
// // //     setConnectionStatus('Failed to connect to any API endpoint');
// // //     return null;
// // //   };

// // //   const initializeConnection = useCallback(async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       const activeApiUrl = await tryAllApiEndpoints();
      
// // //       if (activeApiUrl) {
// // //         const api = createApi(activeApiUrl);
// // //         const response = await api.get('/api/users');
// // //         setUsers(response.data.data || []);
// // //         setMessage(`Connected successfully - Loaded ${response.data.count} users`);
// // //       } else {
// // //         setMessage('Unable to connect to any API endpoint');
// // //       }
// // //     } catch (error) {
// // //       console.error('Connection error:', error);
// // //       setMessage(`Connection error: ${error.response?.data?.message || error.message}`);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     initializeConnection();
// // //     const intervalId = setInterval(initializeConnection, 30000);
// // //     return () => clearInterval(intervalId);
// // //   }, [initializeConnection]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!currentApiUrl) {
// // //       setMessage('No active API connection');
// // //       return;
// // //     }

// // //     try {
// // //       setIsLoading(true);
// // //       const api = createApi(currentApiUrl);
// // //       const response = await api.post('/api/users', { name, email });
      
// // //       setName('');
// // //       setEmail('');
      
// // //       const updatedUsersResponse = await api.get('/api/users');
// // //       setUsers(updatedUsersResponse.data.data || []);
      
// // //       setMessage(`User ${response.data.data.name} added successfully`);
// // //     } catch (error) {
// // //       console.error('Add user error:', error);
// // //       setMessage(`Add user error: ${error.response?.data?.message || error.message}`);
// // //       if (error.response?.status === 503) {
// // //         initializeConnection();
// // //       }
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async (userId) => {
// // //     if (!currentApiUrl) {
// // //       setMessage('No active API connection');
// // //       return;
// // //     }

// // //     try {
// // //       setIsLoading(true);
// // //       const api = createApi(currentApiUrl);
// // //       await api.delete(`/api/users/${userId}`);
      
// // //       const response = await api.get('/api/users');
// // //       setUsers(response.data.data || []);
      
// // //       setMessage('User deleted successfully');
// // //     } catch (error) {
// // //       console.error('Delete error:', error);
// // //       setMessage(`Delete error: ${error.response?.data?.message || error.message}`);
// // //       if (error.response?.status === 503) {
// // //         initializeConnection();
// // //       }
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-4">
// // //       <h1 className="text-3xl font-bold mb-4">User Management App</h1>
      
// // //       <div className="mb-4">
// // //         <p className="text-gray-600">Current API: {currentApiUrl || 'Not connected'}</p>
// // //         <p className="text-gray-600">Status: {connectionStatus}</p>
// // //         <button 
// // //           onClick={initializeConnection}
// // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
// // //           disabled={isLoading}
// // //         >
// // //           {isLoading ? 'Checking Connection...' : 'Refresh Connection'}
// // //         </button>
// // //       </div>

// // //       {message && (
// // //         <div className={`p-4 mb-4 rounded ${message.includes('error') ? 'bg-red-100' : 'bg-green-100'}`}>
// // //           {message}
// // //         </div>
// // //       )}

// // //       <form onSubmit={handleSubmit} className="mb-6">
// // //         <div className="mb-4">
// // //           <input
// // //             type="text"
// // //             placeholder="Name"
// // //             value={name}
// // //             onChange={(e) => setName(e.target.value)}
// // //             className="w-full p-2 border rounded"
// // //             required
// // //             disabled={isLoading || !currentApiUrl}
// // //             minLength={2}
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
// // //             disabled={isLoading || !currentApiUrl}
// // //           />
// // //         </div>
// // //         <button
// // //           type="submit"
// // //           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
// // //           disabled={isLoading || !currentApiUrl}
// // //         >
// // //           {isLoading ? 'Processing...' : 'Add User'}
// // //         </button>
// // //       </form>

// // //       <div>
// // //         <h2 className="text-xl font-bold mb-4">Users ({users.length})</h2>
// // //         <div className="space-y-2">
// // //           {users.map(user => (
// // //             <div key={user._id} className="flex justify-between items-center bg-gray-50 p-4 rounded">
// // //               <div>
// // //                 <p className="font-medium">{user.name}</p>
// // //                 <p className="text-gray-600">{user.email}</p>
// // //               </div>
// // //               <button
// // //                 onClick={() => handleDelete(user._id)}
// // //                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400"
// // //                 disabled={isLoading || !currentApiUrl}
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

// // const API_URL = process.env.REACT_APP_API_URL || 'http://api.awsaparna123.xyz';

// // function App() {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [users, setUsers] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

// //   const api = axios.create({
// //     baseURL: API_URL,
// //     timeout: 5000,
// //     headers: {
// //       'Content-Type': 'application/json'
// //     }
// //   });

// //   const checkConnection = async () => {
// //     try {
// //       const response = await api.get('/api/health');
// //       if (response.data.status === 'healthy') {
// //         setConnectionStatus('Connected');
// //         return true;
// //       }
// //     } catch (error) {
// //       console.error('Health check failed:', error);
// //       setConnectionStatus('Disconnected');
// //       return false;
// //     }
// //   };

// //   const fetchUsers = useCallback(async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await api.get('/api/users');
// //       setUsers(response.data.data || []);
// //       setMessage(`Loaded ${response.data.count} users`);
// //     } catch (error) {
// //       console.error('Fetch users error:', error);
// //       setMessage('Failed to fetch users');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const initialize = async () => {
// //       const isConnected = await checkConnection();
// //       if (isConnected) {
// //         fetchUsers();
// //       }
// //     };

// //     initialize();
// //     const intervalId = setInterval(initialize, 30000);
// //     return () => clearInterval(intervalId);
// //   }, [fetchUsers]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setIsLoading(true);
// //       await api.post('/api/users', { name, email });
// //       setName('');
// //       setEmail('');
// //       await fetchUsers();
// //       setMessage('User added successfully');
// //     } catch (error) {
// //       setMessage(error.response?.data?.message || 'Failed to add user');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleDelete = async (userId) => {
// //     try {
// //       setIsLoading(true);
// //       await api.delete(`/api/users/${userId}`);
// //       await fetchUsers();
// //       setMessage('User deleted successfully');
// //     } catch (error) {
// //       setMessage('Failed to delete user');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-3xl font-bold mb-4">User Management App</h1>
      
// //       <div className="mb-4">
// //         <p className="text-gray-600">API Status: {connectionStatus}</p>
// //         <button 
// //           onClick={checkConnection}
// //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
// //           disabled={isLoading}
// //         >
// //           Check Connection
// //         </button>
// //       </div>

// //       {message && (
// //         <div className={`p-4 mb-4 rounded ${message.includes('Failed') ? 'bg-red-100' : 'bg-green-100'}`}>
// //           {message}
// //         </div>
// //       )}

// //       <form onSubmit={handleSubmit} className="mb-6">
// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             placeholder="Name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             required
// //             disabled={isLoading}
// //             minLength={2}
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
// //           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
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
// //               <div>
// //                 <p className="font-medium">{user.name}</p>
// //                 <p className="text-gray-600">{user.email}</p>
// //               </div>
// //               <button
// //                 onClick={() => handleDelete(user._id)}
// //                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400"
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

// const API_URL = process.env.REACT_APP_API_URL;

// function App() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

//   const api = axios.create({
//     baseURL: API_URL,
//     timeout: 10000,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     withCredentials: true
//   });

//   const checkConnection = async () => {
//     try {
//       const response = await api.get('/api/health');
//       if (response.data.status === 'healthy') {
//         setConnectionStatus('Connected');
//         return true;
//       }
//     } catch (error) {
//       console.error('Health check failed:', error);
//       setConnectionStatus(`Disconnected (${error.message})`);
//       return false;
//     }
//   };

//   const fetchUsers = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const response = await api.get('/api/users');
//       setUsers(response.data.data || []);
//       setMessage(`Loaded ${response.data.count} users`);
//     } catch (error) {
//       console.error('Fetch users error:', error);
//       setMessage('Failed to fetch users');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const initialize = async () => {
//       const isConnected = await checkConnection();
//       if (isConnected) {
//         fetchUsers();
//       }
//     };

//     initialize();
//     const intervalId = setInterval(initialize, 30000);
//     return () => clearInterval(intervalId);
//   }, [fetchUsers]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       await api.post('/api/users', { name, email });
//       setName('');
//       setEmail('');
//       await fetchUsers();
//       setMessage('User added successfully');
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Failed to add user');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (userId) => {
//     try {
//       setIsLoading(true);
//       await api.delete(`/api/users/${userId}`);
//       await fetchUsers();
//       setMessage('User deleted successfully');
//     } catch (error) {
//       setMessage('Failed to delete user');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">User Management App</h1>
      
//       <div className="mb-4">
//         <p className="text-gray-600">API Status: {connectionStatus}</p>
//         <p className="text-sm text-gray-500">API URL: {API_URL}</p>
//         <button 
//           onClick={checkConnection}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//           disabled={isLoading}
//         >
//           Check Connection
//         </button>
//       </div>

//       {message && (
//         <div className={`p-4 mb-4 rounded ${message.includes('Failed') ? 'bg-red-100' : 'bg-green-100'}`}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//             disabled={isLoading}
//             minLength={2}
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
//                 onClick={() => handleDelete(user._id)}
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

const API_URL = process.env.REACT_APP_API_URL || 'http://api.awsaparna123.xyz:5000';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

  const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    withCredentials: false  // Changed to false since we're using a different domain
  });

  const checkConnection = async () => {
    try {
      setConnectionStatus('Checking connection...');
      const response = await api.get('/api/health');
      if (response.data.status === 'healthy') {
        setConnectionStatus('Connected');
        return true;
      }
      throw new Error('Unhealthy response');
    } catch (error) {
      console.error('Health check failed:', error);
      setConnectionStatus(`Disconnected (${error.message})`);
      return false;
    }
  };

  const fetchUsers = useCallback(async () => {
    if (connectionStatus !== 'Connected') {
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get('/api/users');
      if (response.data.success) {
        setUsers(response.data.data || []);
        setMessage(`Loaded ${response.data.count} users`);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Fetch users error:', error);
      setMessage('Failed to fetch users');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [connectionStatus]);

  useEffect(() => {
    const initialize = async () => {
      const isConnected = await checkConnection();
      if (isConnected) {
        fetchUsers();
      }
    };

    initialize();
    const intervalId = setInterval(initialize, 30000);
    return () => clearInterval(intervalId);
  }, [fetchUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setMessage('Please fill in all fields');
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.post('/api/users', { name, email });
      if (response.data.success) {
        setName('');
        setEmail('');
        await fetchUsers();
        setMessage('User added successfully');
      } else {
        throw new Error(response.data.message || 'Failed to add user');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Failed to add user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setIsLoading(true);
      const response = await api.delete(`/api/users/${userId}`);
      if (response.data.success) {
        await fetchUsers();
        setMessage('User deleted successfully');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Management App</h1>
      
      <div className="mb-4">
        <p className="text-gray-600">API Status: {connectionStatus}</p>
        <p className="text-sm text-gray-500">API URL: {API_URL}</p>
        <button 
          onClick={checkConnection}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          Check Connection
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Failed') || message.includes('error') ? 'bg-red-100' : 'bg-green-100'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading || connectionStatus !== 'Connected'}
            minLength={2}
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
            disabled={isLoading || connectionStatus !== 'Connected'}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          disabled={isLoading || connectionStatus !== 'Connected'}
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
                onClick={() => handleDelete(user._id)}
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
