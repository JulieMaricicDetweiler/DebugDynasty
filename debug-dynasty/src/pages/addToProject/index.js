import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import firebaseConfig from '../../firebase/firebaseConfig';
import { getFirestore, doc, addDoc, collection, setDoc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../components/authContext/authContext';
import { useCurrentProject } from '../../components/ProjectContext/projectContext';
import "../../colors.css";

const AddSelf = () => {
    const [projectToken, setProjectToken] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [docId, setDocId] = useState('');
    const {currentUser} = React.useContext(AuthContext);
    const { setCurrentProject } = useCurrentProject();

    const handleProjectTokenChange = (event) => {
        setProjectToken(event.target.value);
    };

    // form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        //add project to projects firestore collection
        try {
            const projectRef = doc(firebaseConfig.firestore, "projects", projectToken);
            const userRef = doc(firebaseConfig.firestore, "users", currentUser.uid);
            const projectUserRef = doc(projectRef, "users", currentUser.uid);
            const userProjectsRef = collection(userRef, "projects");
            const projectSnap = await getDoc(projectRef);
            if(projectSnap.exists()) {
                const projectName = projectSnap.data().name;
                // Check if project exists for user
                const userProjectsSnap = await getDoc(doc(userProjectsRef, projectToken));
                if (!userProjectsSnap.exists()) {
                    // Add project token to the user's projects subcollection
                    await setDoc(doc(userProjectsRef, projectToken), { projectToken, projectName});
                  
                    // Fetch user data
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        // Set user data in project's user subcollection
                        await setDoc(projectUserRef, {
                            firstName: userSnap.data().firstName,
                            lastName: userSnap.data().lastName,
                            email: userSnap.data().email
                        });
                    } else {
                        console.log("No such user exists!");
                    }
                } else {
                    console.log("Project already added to the user");
                }
            }

            setProjectToken(''); // Reset field after processing
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div>
            {currentUser ?
                <Box className="add-self-container" sx={{ maxWidth: '40%', mx: 'auto', my: 4, marginTop: '110px'}}>
                    <Box className="dashboard-header" display={'flex'} flexDirection={'row'} justifyContent="space-between">
                        <h1 style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: 'normal', color: 'var(--med-green)'}}>Add Yourself to a Project</h1>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Project Token"
                            variant="outlined"
                            value={projectToken}
                            onChange={handleProjectTokenChange}
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
                            Add Me
                        </Button>
                    </form>
                </Box>
                :
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: 'x-large'
                }}>
                    Please log in or sign up to add yourself to a project.
                </Typography>
                <Link href="/login" sx={{
                    textAlign: 'center',
                    fontSize: 'x-large',
                    textDecoration: 'none',
                    padding: '10px 15px 10px 15px',
                    backgroundColor: "var(--dark-green)",
                    color: 'white',
                    marginTop: '30px',
                    display: 'block',
                    borderRadius: 1
                
                }}>
                    Log in
                </Link>
            </Box>

            }
    </div>
    );
}

export default AddSelf;
