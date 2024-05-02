import * as React from 'react';
import firebaseConfig from "../../firebase/firebaseConfig";
import { AuthContext } from "../../components/authContext/authContext";
import {Typography, Link, Box, Accordion, AccordionSummary, AccordionDetails, Button, Grid, Select, MenuItem} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircle from '@mui/icons-material/CheckCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import GitHubIcon from '@mui/icons-material/GitHub';
import ControlPointIcon from '@mui/icons-material/ControlPoint'; //circle to add new item
import AddIssue from '../../components/AddIssue/AddIssue';
import GitHubAuth from '../../components/GitHubAuth/GitHubAuth';
import { useCurrentProject } from '../../components/ProjectContext/projectContext';
import { doc, collection, setDoc, getDoc, getDocs, onSnapshot, writeBatch } from 'firebase/firestore';
import DisplayIssues from '../../components/DisplayIssues/displayIssues';
import "./index.css";
import "../../colors.css"

const Dashboard = () => {
    const { currentUser } = React.useContext(AuthContext);
    const [editMode, setEditMode] = React.useState(false);
    const [selectedIssues, setSelectedIssues] = React.useState([]);
    const [isAddIssueModalOpen, setIsAddIssueModalOpen] = React.useState(false);
    const [isGitHubAuthModalOpen, setIsGitHubAuthModalOpen] = React.useState(false);
    const { currentProject, setCurrentProject } = useCurrentProject();
    const [projects, setProjects] = React.useState([]);
    const [issues, setIssues] = React.useState([]);
    const [selectedProject, setSelectedProject] = React.useState('');

    React.useEffect(() => {
        const getProjects = async () => {
        if (currentUser) {
            const userDocRef = doc(firebaseConfig.firestore, "users", currentUser.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const projectsRef = collection(userDocRef, "projects");
                const projectsSnap = await getDocs(projectsRef);
                if(!projectsSnap.empty) {
                    const fetchedProjects = projectsSnap.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setProjects(fetchedProjects);
                }
            }
        };
    };
    getProjects();
    }, [currentUser, setCurrentProject]);

    
    React.useEffect(() => {
        if (currentProject && currentUser && currentUser.uid) {
            const issuesRef = collection(firebaseConfig.firestore, `projects/${currentProject}/users/${currentUser.uid}/issues`);
            const unsubscribe = onSnapshot(issuesRef, (snapshot) => {
                const fetchedIssues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setIssues(fetchedIssues);
            }, error => {
                console.error("Failed to fetch issues:", error);
            });
    
            return () => unsubscribe(); // Cleanup subscription on unmount
        }
    }, [currentProject, currentUser]);
    

    const handleProjectChange = (event) => {
        const newProjectId = event.target.value;
        setSelectedProject(newProjectId);
        if(!setCurrentProject) {
            console.log("problem");
        }
        else {
        setCurrentProject(newProjectId);
        }
    };

    const handleDeleteIssues = async () => {
        const batch = writeBatch(firebaseConfig.firestore);

        selectedIssues.forEach(async (issueId) => {
            const issueRef = doc(firebaseConfig.firestore, `projects/${currentProject}/users/${currentUser.uid}/issues`, issueId);
            batch.delete(issueRef); //prepare delete
        });

        try {
            await batch.commit();
            console.log('Selected issues deleted successfully');
            //fetch issues again or remove them from state to update the UI
            const updatedIssues = issues.filter(issue => !selectedIssues.includes(issue.id));
            setIssues(updatedIssues); //update the state to reflect the deletion in the UI
            setSelectedIssues([]); //clear selected issues after deletion
        } catch (error) {
            console.error('Error deleting selected issues:', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setSelectedIssues([]);
    };

    const toggleIssueSelection = (issueId) => {
        if (selectedIssues.includes(issueId)) {
            setSelectedIssues(selectedIssues.filter(id => id !== issueId));
        } else {
            setSelectedIssues([...selectedIssues, issueId]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedIssues.length === issues.length) {
            setSelectedIssues([]); // If all issues are already selected, clear the selection
        } else {
            setSelectedIssues(issues.map(issue => issue.id)); // Otherwise, select all issues
        }
    };

    const toggleAddIssueModal = () => {
        setIsAddIssueModalOpen(!isAddIssueModalOpen);
    };

    const toggleGitHubAuthModal = () => {
        setIsGitHubAuthModalOpen(!isGitHubAuthModalOpen);
    };

    return (
        <div>
            {currentUser ?  //checks if a user is logged in
                <Box className="dashboard-container" paddingTop='90px' maxWidth={'70%'} display={'flex'} flexDirection={'column'} margin={'auto'}>
                    {projects.length > 0 
                    ?
                    <>
                    <Box className="dashboard-header" display={'flex'} flexDirection={'row'} justifyContent="space-between" paddingBottom={'50px'}>
                        <h1 style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: 'normal', color: 'var(--med-green)'}}>Issues Dashboard</h1>
                        <Select
                            value={selectedProject}
                            onChange={handleProjectChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ width: 200 }}
                        >
                            {projects.map(project => (
                                <MenuItem key={project.id} value={project.id}>{project.projectName}</MenuItem>
                            ))}
                        </Select>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button type="button" className="editButton" onClick={toggleEditMode}>{editMode ? "Cancel" : "Edit"}</button>
                        <EditNoteIcon  cursor='pointer' style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '60px', color: "var(--dark-green)" }} onClick={toggleEditMode}/>
                        </div>
                        
                    </Box>

                        <DisplayIssues 
                            issues={issues} 
                            editMode={editMode} 
                            selectedIssues={selectedIssues} 
                            toggleIssueSelection={toggleIssueSelection} 
                        />
                        
                        <Box style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px'}}>
                            <ControlPointIcon cursor='pointer' style={{ fontSize: '30px', color: "var(--black-green)"}} onClick={toggleAddIssueModal} />
                            {/*Add Issues modal*/}
                            <AddIssue isOpen={isAddIssueModalOpen} onClose={toggleAddIssueModal} fromIndividual={true} currentProject={currentProject} />
                        </Box>

                        {//button options when in edit mode
                        editMode &&
                        <Box style={{ width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'center', paddingTop: '80px'}}>
                            <Grid container spacing={10} justifyContent="center" style={{ maxWidth: '80%' }}>
                            <Grid item xs={12} sm={4}>
                                <Button fullWidth className="btn-nice" onClick={handleDeleteIssues}>
                                <span><DeleteIcon style={{ marginLeft: '6px', marginRight: '6px', fontSize: '24px' }}/>
                                Delete</span>
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button fullWidth className="btn-nice" onClick={toggleGitHubAuthModal}>
                                <span><GitHubIcon style={{ marginLeft: '6px', marginRight: '6px', fontSize: '24px' }} />
                                GitHub</span>
                                </Button>
                                <GitHubAuth isOpen={isGitHubAuthModalOpen} onClose={toggleGitHubAuthModal} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button fullWidth className="btn-nice" onClick={toggleSelectAll}>
                                Select All
                                </Button>
                            </Grid>
                            </Grid>
                        </Box>
                        }
                    </>
                    :

                    <Box display="flex" flexDirection="column" justifyContent="center" textAlign='center'>
                        <h1 style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: 'normal', color: 'var(--med-green)'}}>Issues Dashboard</h1>
                        <hr></hr>
                        <Box paddingTop="30px" maxWidth="80%" margin={'auto'}>
                            <Typography style={{fontFamily: 'Poppins', fontSize: 'large'}}>
                                Looks like you're not currently a part of any project!
                            </Typography>
                            <Typography style={{fontFamily: 'Poppins', fontSize: 'large'}}>
                                Use the links below to either register a project or add yourself to one if you already have a project token!
                            </Typography>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} maxWidth={'50%'} paddingTop={'15px'} margin={'auto'}>
                                <Link href="/register" sx={{
                                textAlign: 'center',
                                fontSize: 'medium',
                                textDecoration: 'none',
                                padding: '10px 15px 10px 15px',
                                backgroundColor: "var(--dark-green)",
                                color: 'white',
                                marginTop: '30px',
                                display: 'block',
                                borderRadius: 1
                                }}>
                                    Register Project
                                </Link>

                                <Link href="/addMe" sx={{
                                textAlign: 'center',
                                fontSize: 'medium',
                                textDecoration: 'none',
                                padding: '10px 15px 10px 15px',
                                backgroundColor: "var(--dark-green)",
                                color: 'white',
                                marginTop: '30px',
                                display: 'block',
                                borderRadius: 1
                                }}>
                                    Add Me to Project
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                }
                </Box>

            : //when user is not logged in, do not render any details, only login message
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: 'x-large'
                }}>
                    Oops! Looks like you're not logged in yet. Click the link below to log in.
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
    )
}

export default Dashboard;