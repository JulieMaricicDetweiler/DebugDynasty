import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Octokit } from '@octokit/core';
import { AuthContext } from '../authContext/authContext';
import firebaseConfig from '../../firebase/firebaseConfig';
import { doc, collection, setDoc, getDoc, getDocs, addDoc } from 'firebase/firestore';

const GitHubAuth = ({ isOpen, onClose, currentProject }) => {
  const [repositoryName, setRepositoryName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [issues, setIssues] = useState([]);
  const {currentUser} = React.useContext(AuthContext);

  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // getMonth() returns 0 for January, 11 for December
    const day = date.getDate();
    const year = date.getFullYear(); 
    return `${month}-${day}-${year}`; 
  };

  const handleSubmit = async () => {
    try {
      const octokit = new Octokit({
        auth: authToken
      });
      
      const response = await octokit.request('GET /issues', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        owner: ownerName,
        repo: repositoryName
      });
      console.log('GitHub API Response:', response.data);



      const extractedIssues = response.data.map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.body,
        tags: issue.labels.map(label => label.name), // Extract label names
        time: formatDate(Date.now()),
        fromUser: false,
        status: 'Open',
        severity: 'medium'
      }));
      
      // Log the extracted issues to the console
      console.log('Extracted Issues:', extractedIssues);

      let effectiveAssignee = currentUser.uid;
      
      for (const issue of extractedIssues) {
        try {
          const projectUserRef = doc(firebaseConfig.firestore, `projects/${currentProject}/users`, effectiveAssignee);
          await addDoc(collection(projectUserRef, "issues"), issue);
          console.log("Issue added to the database:", issue);
        } catch (error) {
          console.error("Error adding issue to the database:", error);
        }
      }
      


    } catch (error) {
      console.error('Error fetching GitHub issues:', error);
    }


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
          label="Repository Owner Username"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
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