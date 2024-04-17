import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from '@mui/material';

function LiveTransactions({ ws }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'blockchain') {
        const updatedChain = data.payload;
        const latestBlock = updatedChain[updatedChain.length - 1];
        setTransactions((prevTransactions) => [
          ...latestBlock.transactions,
          ...prevTransactions,
        ]);
      }
    };
  }, [ws]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Live Transactions
      </Typography>
      {transactions.map((tx, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Typography>From: {tx.from}</Typography>
          <Typography>To: {tx.to}</Typography>
          <Typography>Amount: {tx.amount}</Typography>
          <Typography variant="caption" color="textSecondary">
            Transaction {index + 1}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default LiveTransactions;
