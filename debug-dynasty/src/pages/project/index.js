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
import "../dashboard/index.css";
import "../../colors.css"

const ProjectDashboard = () => {
    const { currentUser } = React.useContext(AuthContext);
    const [editMode, setEditMode] = React.useState(false);
    const [selectedIssues, setSelectedIssues] = React.useState([]);
    const [isAddIssueModalOpen, setIsAddIssueModalOpen] = React.useState(false);
    const [isGitHubAuthModalOpen, setIsGitHubAuthModalOpen] = React.useState(false);
    const { currentProject, setCurrentProject } = useCurrentProject();
    const [projects, setProjects] = React.useState([]);
    const [issues, setIssues] = React.useState([]);
    const [unassignedIssues, setUnassignedIssues] = React.useState([]);
    const [selectedProject, setSelectedProject] = React.useState('');
    const [projectIssues, setProjectIssues] = React.useState({});

    //stays same
    React.useEffect(() => {
        const getProjects = async () => {
        if (currentUser) {
            console.log("Curr Project: " + currentProject);
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
                    setCurrentProject(fetchedProjects[0].id);
                }
            }
        };
    };
    getProjects();
    }, [currentUser, setCurrentProject]);

    
    React.useEffect(()=> {
        const getIssues = async () => {
        console.log("Current Project: " + currentProject);
        if(currentProject) {
            const projectRef = doc(firebaseConfig.firestore, "projects", currentProject);
            const usersRef = collection(projectRef, "users");
            const usersSnap = await getDocs(usersRef);

            const issuesByUser = {};
            for (let userDoc of usersSnap.docs) {
                const user = userDoc.data();
                const issuesRef = collection(userDoc.ref, "issues");
                const issuesSnap = await getDocs(issuesRef);
                issuesByUser[userDoc.id] = {
                    name: `${user.firstName} ${user.lastName}`,
                    issues: issuesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                };
            }
            setProjectIssues(issuesByUser);

            const unassignedRef = collection(firebaseConfig.firestore, `projects/${currentProject}/submittedIssues`);
            const snapshot = await getDocs(unassignedRef);
            setUnassignedIssues(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
    };
    getIssues();
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


    const toggleIssueSelection = (issueId) => {
        if (selectedIssues.includes(issueId)) {
            setSelectedIssues(selectedIssues.filter(id => id !== issueId));
        } else {
            setSelectedIssues([...selectedIssues, issueId]);
        }
    };


    return (
        <div>
            {currentUser ?  //checks if a user is logged in
                <Box className="dashboard-container" paddingTop='90px' maxWidth={'70%'} display={'flex'} flexDirection={'column'} margin={'auto'}>
                    {projects.length > 0 
                    ?
                    <>
                    <Box className="dashboard-header" display={'flex'} flexDirection={'column'} justifyContent="space-between" paddingBottom={'50px'}>
                        <h1 style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: 'normal', color: 'var(--med-green)'}}>Project Dashboard</h1>
                        <hr></hr>
                        <Box>
                            <Box sx={{ color: 'var(--dark-green)', fontSize: '16px', textAlign: 'left' }}>
                                <b>Project Selection</b>
                            </Box>
                            <Select
                                value={selectedProject}
                                onChange={handleProjectChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: 200, fontSize: 'medium'}}
                            >
                                {projects.map(project => (
                                    <MenuItem key={project.id} value={project.id} sx={{ fontSize: 'medium' }}>{project.projectName}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        
                    </Box>

                    {currentProject &&
                    <Box>
                        {Object.entries(projectIssues).map(([userId, userData]) => (
                            <Box key={userId} mb={4}>
                                <Typography variant="h4" paddingBottom={'10px'}>{userData.name}</Typography>
                                {userData.issues.length > 0 ?
                                <DisplayIssues issues={userData.issues} editMode={editMode} selectedIssues={selectedIssues} toggleIssueSelection={toggleIssueSelection} />
                                :
                                <Typography variant="h5" style={{fonstSize: 'large', fontFamily: 'Poppins'}}>No issues assigned to this user yet!</Typography>
                                }
                            </Box>
                        ))}
                        <hr></hr>
                        <Typography variant="h4" paddingTop={'20px'} paddingBottom={'10px'}>Unassigned Issues</Typography>
                        <DisplayIssues issues={unassignedIssues} editMode={editMode} selectedIssues={selectedIssues} toggleIssueSelection={toggleIssueSelection}/>
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

export default ProjectDashboard;