import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [userType, setUserType] = useState('freelancer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: fullName,
      email,
      password,
      role: userType,
      ...(userType === 'freelancer' && { skills: skills.split(',').map(skill => skill.trim()), hourlyRate })
    };
    try {
      const res = await axios.post('/api/auth/register', userData);
      console.log(res.data);
      // Handle successful registration, e.g., redirect to login
    } catch (err) {
      console.error(err.response.data);
      // Handle registration error
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <a href="/" className="back-link">&larr; Back to Home</a>
          <div className="lightning-icon">&#9889;</div>
          <h2>Join BitLance</h2>
          <p>Start earning or hiring with Lightning payments</p>
        </div>
        <div className="user-type-selection">
          <div 
            className={`user-type ${userType === 'freelancer' ? 'active' : ''}`}
            onClick={() => setUserType('freelancer')}
          >
            <div className='user-icon'>&#129489;</div>
            <strong>Freelancer</strong>
            <p>Sell your skills</p>
          </div>
          <div 
            className={`user-type ${userType === 'client' ? 'active' : ''}`}
            onClick={() => setUserType('client')}
          >
            <div className='user-icon'>&#128188;</div>
            <strong>Client</strong>
            <p>Hire talent</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {userType === 'freelancer' && (
            <div className="freelancer-profile">
              <div className="freelancer-header">
                 <div className='user-icon'>&#129489;</div>
                <h3>Freelancer Profile</h3>
              </div>
              <div className="input-group">
                <label>Skills (comma-separated)</label>
                <input type="text" placeholder="JavaScript, React, Node.js" value={skills} onChange={(e) => setSkills(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Hourly Rate (USD)</label>
                <input type="number" placeholder="50" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
              </div>
            </div>
          )}

          <button type="submit" className="btn-create-account">Create Account</button>
          <p className="signin-link">Already have an account? <a href="/login">Sign in</a></p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
