import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <a href={`/jobs/${job.id}`}>{job.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsPage;
