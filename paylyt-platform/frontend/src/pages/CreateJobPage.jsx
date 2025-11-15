import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CreateJobPage.css';

const CreateJobPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to post a job.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/jobs',
        {
          title,
          description,
          amount_fiat: amount,
          deadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history.push(`/jobs/${response.data.id}`); // Redirect to the new job's detail page
    } catch (err) {
      setError('Failed to create job. Please check your inputs.');
      console.error(err);
    }
  };

  return (
    <div className="create-job-container">
      <div className="create-job-box">
        <h2 className="create-job-title">Post a New Job</h2>
        <p className="create-job-subtitle">Describe your project to find the perfect freelancer.</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="title">Job Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build a responsive website"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the work..."
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="amount">Budget (USD)</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 500"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-post-job">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
