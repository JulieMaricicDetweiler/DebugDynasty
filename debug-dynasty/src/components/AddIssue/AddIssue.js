import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { AuthContext } from '../authContext/authContext';
import firebaseConfig from '../../firebase/firebaseConfig';
import { doc, collection, setDoc, getDoc, getDocs, addDoc } from 'firebase/firestore';


const AddIssue = ({ isOpen, onClose, fromIndividual, currentProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [assignee, setAssignee] = useState('');
  const {currentUser} = React.useContext(AuthContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
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
            status: 'Open'
        });
    } catch (error) {
        console.log("Error creating issue: ", error);
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
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        {!fromIndividual &&
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
        }

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