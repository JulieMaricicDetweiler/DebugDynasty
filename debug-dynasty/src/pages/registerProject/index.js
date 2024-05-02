import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import firebaseConfig from '../../firebase/firebaseConfig';
import { getFirestore, doc, addDoc, collection, setDoc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../components/authContext/authContext';
//import { useCurrentProject } from '../../components/ProjectContext/projectContext';
import "../../colors.css";
import"./index.css";

const Register = () => {
    const [projectName, setProjectName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [docId, setDocId] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const {currentUser} = React.useContext(AuthContext);
    //const { setCurrentProject } = useCurrentProject();

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
            if (currentUser) {
                // Fetch user details from the main users collection
                const userRef = doc(firebaseConfig.firestore, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
    
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    const projectUsersRef = doc(docRef, "users", currentUser.uid);
    
                    // Set the user document in the project's users subcollection using the uid as the document ID
                    await setDoc(projectUsersRef, {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email
                    });
                } else {
                    console.log("No such user!");
                }
            }

            setDocId(docRef.id); // save document ID for the token message
            setOpenSnackbar(true); // open snackbar and display token

            // Set the current project
            //setCurrentProject(docRef.id);

            setProjectName(''); //reset field
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Handle snackbar close
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setIsCopied(false);
    };

    const handleCopyToken = () => {
        navigator.clipboard.writeText(docId);
        setIsCopied(true);
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
                            backgroundColor: 'var(--dark-green)',
                            borderRadius: '4px',
                            transition: '0s',
                        }}
                        sx={{ mt: 2 }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--med-green)'; 
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--dark-green)';
                            e.currentTarget.style.color = 'white';
                        }}>
                    Register
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={(
                    <div>
                        <span className='custom-message'>{`Registration successful! 
                        IMPORTANT: Please make note of the following token as this will be used to register users to your 
                        project as well as implement our issue submission endpoint in your project. 
                        Project Token: ${docId}`}</span>
                        <Button
                            className='custom-button'
                            size="small"
                            onClick={handleCopyToken}
                            style={{
                                marginLeft: '10px',
                            }}
                        >
                            Copy Token
                        </Button>
                        {isCopied && <span style={{ marginLeft: '10px', fontSize: '20px' }}>Token Copied!</span>}
                    </div>
                )}
                action={
                    <Button className='custom-button' size="small" onClick={handleCloseSnackbar}>
                        Close
                    </Button>
                }
                ContentProps={{
                    className: 'custom-snackbar',
                }}
            />
        </Box>
    );
}

export default Register;
