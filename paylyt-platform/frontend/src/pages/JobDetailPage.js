import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProposalModal from '../components/ProposalModal';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom'; // Import useHistory

const JobDetailPage = ({ match }) => {
  const [job, setJob] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchJobAndProposals = async () => {
      try {
        const jobRes = await axios.get(`/api/jobs/${match.params.id}`);
        setJob(jobRes.data);

        const proposalsRes = await axios.get(`/api/jobs/${match.params.id}/proposals`);
        setProposals(proposalsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobAndProposals();
  }, [match.params.id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      const res = await axios.post(`/api/contracts`, { 
        jobId: job.id, 
        proposalId 
      });
      history.push(`/contracts/${res.data.id}`); // Redirect to contract page
    } catch (err) {
      console.error(err.response.data);
      // Handle contract creation error
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
          <h3>Proposals</h3>
          {proposals.map((proposal) => (
            <div key={proposal.id}>
              <p>{proposal.coverLetter}</p>
              <p>Proposed Rate: ${proposal.proposedRate}</p>
              <button onClick={() => handleAcceptProposal(proposal.id)}>Accept Proposal</button>
            </div>
          ))}
        </div>
      ) : (
        <button onClick={openModal}>Submit Proposal</button>
      )}

      <ProposalModal isOpen={modalIsOpen} onRequestClose={closeModal} jobId={job.id} />
    </div>
  );
};

export default JobDetailPage;
