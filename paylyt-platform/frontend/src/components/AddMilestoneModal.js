import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const AddMilestoneModal = ({ isOpen, onRequestClose, contractId }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/contracts/${contractId}/milestones`, {
        description,
        amount,
        deadline,
      });
      console.log(res.data);
      // Handle successful milestone creation
      onRequestClose();
    } catch (err) {
      console.error(err.response.data);
      // Handle milestone creation error
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Add Milestone</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </Modal>
  );
};

export default AddMilestoneModal;
