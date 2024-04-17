import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';

function Blockchain({ ws }) {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'blockchain') {
        const updatedChain = data.payload;
        setChain(updatedChain);
      }
    };
  }, [ws]);

  const handleResetBlockchain = () => {
    ws.send(JSON.stringify({ type: 'reset' }));
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Blockchain
      </Typography>
      {chain.map((block) => (
        <Paper key={block.index} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Block {block.index}</Typography>
          {block.transactions.map((tx, i) => (
            <Typography key={i}>
              {tx.from} sent {tx.amount} to {tx.to}
            </Typography>
          ))}
        </Paper>
      ))}
      <Button variant="contained" color="secondary" onClick={handleResetBlockchain}>
        Reset Blockchain
      </Button>
    </Box>
  );
}

export default Blockchain;
