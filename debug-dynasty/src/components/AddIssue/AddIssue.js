import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import firebaseConfig from '../../firebase/firebaseConfig';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useCurrentProject } from '../ProjectContext/projectContext';

const AddIssue = ({ isOpen, onClose }) => {
  const { currentProject } = useCurrentProject();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = () => {
    try {
      if (!currentProject) {
        console.error("current project is not set.");
        return;
      }
      // Add logic to submit the issue to the backend
      const issueData = { description, tags, assignee };
      // Add issue to the current project's issues subcollection
      addDoc(collection(doc(firebaseConfig.firestore, 'projects/{currentProject}/users/{currentUser.uid}'), 'issues'), issueData)
        .then(() => {
          setDescription('');
          setTags('');
          setAssignee('');
          onClose();
        })
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
        <h1>Add Issue</h1>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
              sx: {
                fontSize: 'small',
                fontFamily: 'Poppins, sans-serif',
              },
            }}
            InputProps={{
              sx: {
                fontSize: 'small',
                fontFamily: 'Poppins, sans-serif',
              },
            }}
        />
        <TextField
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
              sx: {
                fontSize: 'small',
                fontFamily: 'Poppins, sans-serif',
              },
            }}
            InputProps={{
              sx: {
                fontSize: 'small',
                fontFamily: 'Poppins, sans-serif',
              },
            }}
        />
        <TextField
          label="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
              sx: {
                fontSize: 'small',
                fontFamily: 'Poppins, sans-serif',
              },
            }}
            InputProps={{
              sx: {
                fontSize: 'small',
                fontFamily: 'Poppins, sans-serif',
              },
            }}
        />
        <Button variant="contained" onClick={handleSubmit}
            style={{
              fontSize: 'small',
              fontFamily: 'Poppins, sans-serif',
              paddingTop: '6px',
              paddingBottom: '6px',
              paddingLeft: '12px',
              paddingRight: '12px',
              color: 'white',
              backgroundColor: '#499270',
              borderRadius: '4px',
              transition: '0s',
            }}
            sx={{ mt: 2 }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--light-green)'; 
              e.currentTarget.style.color = 'black';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#499270';
              e.currentTarget.style.color = 'white';
            }}>
          Add Issue</Button>
      </Box>
    </Modal>
  );
};

export default AddIssue;