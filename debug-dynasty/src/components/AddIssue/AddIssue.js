import React, { useState } from 'react';
import { Modal, Box, TextField, Button, MenuItem, Select } from '@mui/material';
import { AuthContext } from '../authContext/authContext';
import firebaseConfig from '../../firebase/firebaseConfig';
import { doc, collection, setDoc, getDoc, getDocs, addDoc } from 'firebase/firestore';

const AddIssue = ({ isOpen, onClose, fromIndividual, currentProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [assignee, setAssignee] = useState('');
  const [severity, setSeverity] = useState('');
  const {currentUser} = React.useContext(AuthContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // getMonth() returns 0 for January, 11 for December
    const day = date.getDate();
    const year = date.getFullYear(); 
    return `${month}-${day}-${year}`; 
  };

  const handleSubmit = async () => {
    let effectiveAssignee = assignee;
    
    if (fromIndividual && currentUser) {
        effectiveAssignee = currentUser.uid;
    }

    try {
        console.log("Assignee: " + effectiveAssignee);
        const projectUserRef = doc(firebaseConfig.firestore, `projects/${currentProject}/users`, effectiveAssignee);
        await addDoc(collection(projectUserRef, "issues"), {
            title: title,
            description: description,
            tags: tags.split(',').map(tag => tag.trim()),
            time: formatDate(Date.now()),
            fromUser: false,
            status: 'Open',
            severity: severity
        });
    } catch (error) {
        console.log("Error creating issue: ", error);
    }
  };

  const handleSeverity = (event) => {
    setSeverity(event.target.value);
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
        p: 4,
        display: 'flex',
        flexDirection: 'column' // Ensures vertical layout
      }}>
        <h1>Add Issue</h1>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
          margin="normal"
        />
        {!fromIndividual &&
          <TextField
            label="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            fullWidth
            margin="normal"
          />
        }
        <Select
          value={severity}
          onChange={handleSeverity}
          displayEmpty
          fullWidth
          margin="normal"
          style={{marginTop: '15px'}}
        >
          {severity === '' && <MenuItem value="" disabled>Severity</MenuItem>}
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleSubmit}
          sx={{
            mt: 2,
            bgcolor: '#499270',
            '&:hover': {
              bgcolor: 'var(--light-green)',
              color: 'black'
            }
          }}>
          Add Issue
        </Button>
      </Box>
    </Modal>
  );
};

export default AddIssue;
