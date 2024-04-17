import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, Snackbar } from '@mui/material';

function SendTransaction({ ws }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    ws.send(JSON.stringify({
      type: 'transaction',
      payload: { from, to, amount }
    }));
    setSuccessMessage('Transaction sent successfully');
  };

  useEffect(() => {
    ws.onerror = () => {
      setErrorMessage('WebSocket connection error');
    };
  }, [ws]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Send Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
      />
    </Box>
  );
}

export default SendTransaction;