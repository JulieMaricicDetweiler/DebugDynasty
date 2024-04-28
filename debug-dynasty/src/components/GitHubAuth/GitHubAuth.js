import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const GitHubAuth = ({ isOpen, onClose }) => {
  const [repositoryName, setRepositoryName] = useState('');
  const [authToken, setAuthToken] = useState('');

  const handleSubmit = () => {
    // Add logic to submit the issue to the backend
    // Reset form fields
    setRepositoryName();
    setAuthToken();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
      }}>
        <h1>GitHub Authentication</h1>
        <TextField
          label="Repository Name"
          value={repositoryName}
          onChange={(e) => setRepositoryName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Authentication Token"
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleSubmit}>Send</Button>
      </Box>
    </Modal>
  );
};

export default GitHubAuth;