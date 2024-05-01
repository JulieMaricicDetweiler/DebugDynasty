import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import firebaseConfig from '../../firebase/firebaseConfig';
import { getFirestore, doc, addDoc, collection } from 'firebase/firestore';
import "../../colors.css";
import"./index.css";

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
        <Box className="register-container" sx={{ maxWidth: 480, mx: 'auto', my: 4, marginTop: '110px'}}>
            <Box className="dashboard-header" display={'flex'} flexDirection={'row'} justifyContent="space-between">
                <h1 style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: 'normal', color: 'var(--med-green)'}}>Register a Project</h1>
            </Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Project Name"
                    variant="outlined"
                    value={projectName}
                    onChange={handleProjectNameChange}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{
                        sx: {
                          fontSize: 'medium',
                          fontFamily: 'Poppins, sans-serif',
                        },
                      }}
                      InputProps={{
                        sx: {
                          fontSize: 'medium',
                          fontFamily: 'Poppins, sans-serif',
                        },
                      }}
                    
                />
                <Button type="submit" variant="contained" className='btn-reg' 
                          style={{
                            fontSize: 'medium',
                            fontFamily: 'Poppins, sans-serif',
                            padding: '8px',
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
                    <Button className='btn-del' size="small" onClick={handleCloseSnackbar}>
                        Close
                    </Button>
                }
            />
        </Box>
    );
}

export default Register;
