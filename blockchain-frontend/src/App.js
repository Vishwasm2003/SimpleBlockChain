import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendTransaction from './SendTransaction';
import Blockchain from './Blockchain';
import LiveTransactions from './LiveTransactions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = new WebSocket('ws://localhost:8080');
    setWs(newWs);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blockchain Money Transfer
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Send Transaction
            </Button>
            <Button color="inherit" component={Link} to="/blockchain">
              Blockchain
            </Button>
            <Button color="inherit" component={Link} to="/live">
              Live Transactions
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Routes>
            <Route exact path="/" element={ws ? <SendTransaction ws={ws} /> : <p>Connecting to WebSocket server...</p>} />
            <Route path="/blockchain" element={ws ? <Blockchain ws={ws} /> : <p>Connecting to WebSocket server...</p>} />
            <Route path="/live" element={ws ? <LiveTransactions ws={ws} /> : <p>Connecting to WebSocket server...</p>} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
