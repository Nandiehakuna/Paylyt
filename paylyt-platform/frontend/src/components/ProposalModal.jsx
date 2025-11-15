import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const ProposalModal = ({ isOpen, onRequestClose, jobId }) => {
  const [proposal, setProposal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/jobs/${jobId}/apply`, {
        proposal,
      });
      console.log(res.data);
      // Handle successful application submission
      onRequestClose();
    } catch (err) {
      console.error(err.response.data);
      // Handle application submission error
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Submit Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Proposal</label>
          <textarea
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default ProposalModal;
