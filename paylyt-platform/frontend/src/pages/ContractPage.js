import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AddMilestoneModal from '../components/AddMilestoneModal';
import DepositModal from '../components/DepositModal';
import WithdrawModal from '../components/WithdrawModal'; // Import WithdrawModal

const ContractPage = ({ match }) => {
  const [contract, setContract] = useState(null);
  const [addMilestoneModalIsOpen, setAddMilestoneModalIsOpen] = useState(false);
  const [depositModalIsOpen, setDepositModalIsOpen] = useState(false);
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false); // State for WithdrawModal
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await axios.get(`/api/jobs/${match.params.id}`); // Corrected endpoint
        setContract(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContract();
  }, [match.params.id]);

  const openAddMilestoneModal = () => {
    setAddMilestoneModalIsOpen(true);
  };

  const closeAddMilestoneModal = () => {
    setAddMilestoneModalIsOpen(false);
  };

  const openDepositModal = () => {
    setDepositModalIsOpen(true);
  };

  const closeDepositModal = () => {
    setDepositModalIsOpen(false);
  };

  const openWithdrawModal = () => {
    setWithdrawModalIsOpen(true);
  };

  const closeWithdrawModal = () => {
    setWithdrawModalIsOpen(false);
  };

  const handleCompleteJob = async () => {
    try {
      const res = await axios.post(`/api/jobs/${contract.id}/complete`);
      setContract(res.data.job); // Update job status
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleApproveJob = async () => {
    try {
      const res = await axios.post(`/api/jobs/${contract.id}/approve`);
      setContract(res.data.job); // Update job status
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!contract) {
    return <div>Loading...</div>;
  }

  const isClient = user && user.id === contract.client_id;
  const isFreelancer = user && user.id === contract.freelancer_id;

  return (
    <div>
      <h2>Contract Details</h2>
      <p>Job: {contract.title}</p>
      {contract.freelancer && <p>Freelancer: {contract.freelancer.name}</p>}
      <p>Status: {contract.status}</p>
      {contract.escrow && <p>Escrow Status: {contract.escrow.status}</p>}

      {isClient && contract.status === 'in_progress' && (
        <button onClick={openDepositModal}>Fund Contract</button>
      )}

      {isFreelancer && contract.status === 'paid_locked' && (
        <button onClick={handleCompleteJob}>Complete Job</button>
      )}

      {isClient && contract.status === 'completed' && (
        <button onClick={handleApproveJob}>Release Funds</button>
      )}

      {isFreelancer && contract.status === 'released' && (
        <button onClick={openWithdrawModal}>Withdraw Funds</button>
      )}

      <h3>Milestones</h3>
      {isClient && <button onClick={openAddMilestoneModal}>Add Milestone</button>}
      <ul>
        {contract.milestones.map((milestone) => (
          <li key={milestone.id}>
            <p>{milestone.description}</p>
            <p>Amount: ${milestone.amount}</p>
            <p>Status: {milestone.status}</p>
            <p>Deadline: {new Date(milestone.deadline).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <AddMilestoneModal isOpen={addMilestoneModalIsOpen} onRequestClose={closeAddMilestoneModal} contractId={contract.id} />
      <DepositModal isOpen={depositModalIsOpen} onRequestClose={closeDepositModal} contractId={contract.id} amount={contract.amount_btc} />
      <WithdrawModal isOpen={withdrawModalIsOpen} onRequestClose={closeWithdrawModal} amount={contract.amount_btc} />
    </div>
  );
};

export default ContractPage;
