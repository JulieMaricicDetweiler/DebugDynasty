import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import firebaseConfig from '../../firebase/firebaseConfig';
import { getFirestore, doc, addDoc, collection } from 'firebase/firestore';
import "../../colors.css";

const Register = () => {
    const [projectName, setProjectName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [docId, setDocId] = useState('');

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    // form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        //add project to projects firestore collection
        try {
            const docRef = await addDoc(collection(firebaseConfig.firestore, "projects"), {
                name: projectName
            });

            setDocId(docRef.id); // save document ID for the token message
            setOpenSnackbar(true); // open snackbar and display token
            setProjectName(''); //reset field
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Handle snackbar close
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box className="register-container" sx={{ maxWidth: 480, mx: 'auto', my: 4, marginTop: '100px'}}>
            <Typography variant="h5" component="h1" gutterBottom>
                Register a Project
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Project Name"
                    variant="outlined"
                    value={projectName}
                    onChange={handleProjectNameChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, backgroundColor: 'var(--dark-green)'}}>
                    Register
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={`Registration successful! 
                IMPORTANT: Please make note of the following token as this will be used to register users to your 
                project as well as implement our issue submission endpoint in your project. 
                Project Token: ${docId}`}
                action={
                    <Button color="var(--dark-green)" size="small" onClick={handleCloseSnackbar}>
                        Close
                    </Button>
                }
            />
        </Box>
    );
}

export default Register;
