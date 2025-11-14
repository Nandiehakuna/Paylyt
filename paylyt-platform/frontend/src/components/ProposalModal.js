import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const ProposalModal = ({ isOpen, onRequestClose, jobId }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedRate, setProposedRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/jobs/${jobId}/proposals`, {
        coverLetter,
        proposedRate,
      });
      console.log(res.data);
      // Handle successful proposal submission
      onRequestClose();
    } catch (err) {
      console.error(err.response.data);
      // Handle proposal submission error
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Submit Proposal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cover Letter</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Proposed Rate</label>
          <input
            type="number"
            value={proposedRate}
            onChange={(e) => setProposedRate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default ProposalModal;
