import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProposalModal from '../components/ProposalModal.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const JobDetailPage = () => {
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      try {
        const jobRes = await axios.get(`/api/jobs/${id}`);
        setJob(jobRes.data);

        const applicationsRes = await axios.get(`/api/jobs/${id}/applications`);
        setApplications(applicationsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobAndApplications();
  }, [id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      const res = await axios.post(`/api/jobs/${job.id}/accept`, {
        applicationId: proposalId
      });
      navigate(`/contracts/${job.id}`); // Redirect to contract page
    } catch (err) {
      console.error(err.response.data);
      // Handle accept error
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  const isClient = user && user.id === job.clientId;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>Budget: ${job.budget}</p>

      {isClient ? (
        <div>
          <h3>Applications</h3>
          {applications.map((application) => (
            <div key={application.id}>
              <p>{application.proposal}</p>
              <button onClick={() => handleAcceptProposal(application.id)}>Accept Application</button>
            </div>
          ))}
        </div>
      ) : (
        <button onClick={openModal}>Submit Application</button>
      )}

      <ProposalModal isOpen={modalIsOpen} onRequestClose={closeModal} jobId={job.id} />
    </div>
  );
};

export default JobDetailPage;
