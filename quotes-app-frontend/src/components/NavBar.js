import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <div>
        <Link to="/browse" style={linkStyle}>Browse</Link>
        {isLoggedIn && (
          <>
            <Link to="/add" style={linkStyle}>Add</Link>
            <Link to="/quotes" style={linkStyle}>Dashboard</Link>
          </>
        )}
      </div>
      <div>
        {!isLoggedIn ? (
          <Link to="/login" style={linkStyle}>Login</Link>
        ) : (
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '15px',
};

const buttonStyle = {
  backgroundColor: 'transparent',
  border: '1px solid white',
  color: 'white',
  padding: '5px 10px',
  cursor: 'pointer'
};
