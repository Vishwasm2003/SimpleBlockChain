// SendTransaction.js
import React, { useState } from 'react';

function SendTransaction() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, amount })
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Send Transaction</h2>
      <label>
        From:
        <input type="text" value={from} onChange={e => setFrom(e.target.value)} />
      </label>
      <label>
        To: 
        <input type="text" value={to} onChange={e => setTo(e.target.value)} />
      </label>
      <label>
        Amount:
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}

export default SendTransaction;
