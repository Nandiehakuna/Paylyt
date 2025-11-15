import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import QRCode from '@qrcode/react';

const DepositModal = ({ isOpen, onRequestClose, contractId, amount }) => {
  const [invoice, setInvoice] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    if (isOpen) {
      const fetchInvoice = async () => {
        try {
          const res = await axios.post(`/api/jobs/${contractId}/invoice`);
          setInvoice(res.data.payment_request);
        } catch (err) {
          console.error(err);
        }
      };
      fetchInvoice();
    }
  }, [isOpen, contractId, amount]);

  useEffect(() => {
    if (invoice) {
      const interval = setInterval(async () => {
        try {
          const res = await axios.get(`/api/jobs/${contractId}/status`);
          if (res.data.status === 'paid_locked') {
            setPaymentStatus('paid');
            clearInterval(interval);
          }
        } catch (err) {
          console.error(err);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [invoice, contractId]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Fund Contract</h2>
      {invoice ? (
        <div>
          <QRCode value={invoice} />
          <p><code>{invoice}</code></p>
          <p>Status: {paymentStatus}</p>
        </div>
      ) : (
        <p>Generating invoice...</p>
      )}
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default DepositModal;
