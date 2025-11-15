import React, { useState } from 'react';
import Modal from 'react-modal';

const WithdrawModal = ({ isOpen, onRequestClose, amount }) => {
  const [withdrawAddress, setWithdrawAddress] = useState('');

  const handleWithdraw = async () => {
    try {
      await axios.post('/api/payments/withdraw', {
        amount_btc: amount,
        address: withdrawAddress
      });
      onRequestClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Withdraw Funds</h2>
      <p>Amount: {amount} BTC</p>
      <input
        type="text"
        placeholder="Enter your Lightning address"
        value={withdrawAddress}
        onChange={(e) => setWithdrawAddress(e.target.value)}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default WithdrawModal;
