// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import QuoteForm from './components/QuoteForm';
import QuoteList from './components/QuoteList';
import EditQuote from './components/EditQuote';
import UserQuotes from './components/UserQuotes';
import NavBar from './components/NavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/add" element={isLoggedIn ? <QuoteForm /> : <Navigate to="/login" />} />
        <Route path="/quotes" element={isLoggedIn ? <QuoteList /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isLoggedIn ? <EditQuote /> : <Navigate to="/login" />} />
        <Route path="/browse" element={<UserQuotes />} />
        <Route path="*" element={<Navigate to="/browse" />} />
      </Routes>
    </Router>
  );
}

export default App;


