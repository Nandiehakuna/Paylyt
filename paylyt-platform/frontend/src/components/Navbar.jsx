import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">PayLyt</Link>
        <div className="navbar-links">
          <Link to="/jobs" className="navbar-link">Browse Jobs</Link>
          {user ? (
            <>
              {user.role === 'client' && (
                <Link to="/create-job" className="btn btn-primary-nav">Post a Job</Link>
              )}
              {user.role === 'freelancer' && (
                <Link to="/dashboard" className="navbar-link">My Dashboard</Link> // Assuming a dashboard route
              )}
              <button onClick={logout} className="btn btn-secondary-nav">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Sign In</Link>
              <Link to="/register" className="btn btn-primary-nav">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
