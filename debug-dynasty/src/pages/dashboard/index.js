import * as React from 'react';
import firebaseConfig from "../../firebase/firebaseConfig";
import { AuthContext } from "../../components/authContext/authContext";
import {Typography, Link, Box, Accordion, AccordionSummary, AccordionDetails, Button, Grid} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircle from '@mui/icons-material/CheckCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import GitHubIcon from '@mui/icons-material/GitHub';
import ControlPointIcon from '@mui/icons-material/ControlPoint'; //circle to add new item
import AddIssue from '../../components/AddIssue/AddIssue';
import GitHubAuth from '../../components/GitHubAuth/GitHubAuth';
import "./index.css";

const Dashboard = () => {
    const { currentUser } = React.useContext(AuthContext);
    const [editMode, setEditMode] = React.useState(false);
    const [selectedIssues, setSelectedIssues] = React.useState([]);
    const [isAddIssueModalOpen, setIsAddIssueModalOpen] = React.useState(false);
    const [isGitHubAuthModalOpen, setIsGitHubAuthModalOpen] = React.useState(false);

    //temporary dummy data
    const issues = [
        {
            id: "1",
            description: "Fix layout bug on dashboard",
            details: {
                tags: ["bug", "UI", "high-priority"],
                assignee: "John Doe"
            }
        },
        {
            id: "2",
            description: "Update dependencies to latest versions",
            details: {
                tags: ["maintenance", "backend"],
                assignee: "Jane Smith"
            }
        },
        {
            id: "3",
            description: "Implement feature X according to spec",
            details: {
                tags: ["feature", "new"],
                assignee: "Alice Johnson"
            }
        }
    ];

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
                    <Box className="dashboard-header" display={'flex'} flexDirection={'row'} justifyContent="space-between" paddingBottom={'50px'}>
                        <h1 style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: 'normal'}}>Issues Dashboard</h1>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button type="button" className="editButton" onClick={toggleEditMode}>{editMode ? "Cancel" : "Edit"}</button>
                            <EditNoteIcon  cursor='pointer' style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '60px', color: '#006400' }} onClick={toggleEditMode}/>
                        </div>
                    </Box>

                    { //display dashboard issues
                    issues.map((issue) => (
                        <Accordion key={issue.id} style={{marginBottom: '15px', backgroundColor: editMode && selectedIssues.includes(issue.id) ? '#aaffaa' : '#b6d4b8'}} disableGutters>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ cursor: 'pointer' }}
                                onClick={() => toggleIssueSelection(issue.id)}
                            >
                                <Typography style={{fontSize: 'large', fontFamily: 'Poppins'}}>
                                    {selectedIssues.includes(issue.id) ?                                         
                                        editMode && <CheckCircle
                                        style={{ marginRight: '30px', cursor: 'pointer', fontSize: '30px', verticalAlign: 'middle'}}
                                    />:
                                        editMode && <CheckCircleOutlineIcon 
                                        style={{ marginRight: '30px', cursor: 'pointer', fontSize: '30px', verticalAlign: 'middle'}} 
                                    />  
                                    }
                                    {issue.id} - {issue.description}
                                    <ExpandMoreIcon style= {{fontSize: '25px', cursor: 'pointer', verticalAlign: 'middle'}}/>
                                </Typography>
                            </AccordionSummary>
                            {!editMode && (
                                <AccordionDetails>
                                    <Typography variant="body2" style={{fontSize: 'large'}}>
                                        <strong>Tags:</strong> {issue.details.tags.join(", ")}
                                    </Typography>
                                    <Typography variant="body2" style={{fontSize: 'large'}}>
                                        <strong>Assignee:</strong> {issue.details.assignee}
                                    </Typography>
                                </AccordionDetails>
                            )}
                        </Accordion>
                    ))}
                    <Box style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px'}}>
                        <ControlPointIcon cursor='pointer' style={{ fontSize: '30px' }} onClick={toggleAddIssueModal} />
                        {/*Add Issues modal*/}
                        <AddIssue isOpen={isAddIssueModalOpen} onClose={toggleAddIssueModal} />
                    </Box>

                    {//button options when in edit mode
                    editMode &&
                    <Box style={{ width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'center', paddingTop: '80px'}}>
                        <Grid container spacing={10} justifyContent="center" style={{ maxWidth: '70%' }}>
                        <Grid item xs={12} sm={4}>
                            <Button fullWidth style={{ fontSize: 'large', padding: '10px', color: 'black', backgroundColor: "#BABABA", borderRadius: '0px' }}>
                            <DeleteIcon style={{ marginRight: '12px', fontSize: '25px' }} />
                            Delete
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button fullWidth style={{ fontSize: 'large', padding: '10px', color: 'black', backgroundColor: "#BABABA", borderRadius: '0px' }} onClick={toggleGitHubAuthModal}>
                            <GitHubIcon style={{ marginRight: '12px', fontSize: '25px' }} />
                            GitHub
                            </Button>
                            <GitHubAuth isOpen={isGitHubAuthModalOpen} onClose={toggleGitHubAuthModal} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button fullWidth style={{ fontSize: 'large', padding: '10px', color: 'black', backgroundColor: "#BABABA", borderRadius: '0px' }} onClick={toggleSelectAll}>
                            Select All
                            </Button>
                        </Grid>
                        </Grid>
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
                    padding: '15px',
                    backgroundColor: '#155426',
                    color: 'white',
                    marginTop: '30px',
                    display: 'block' 
                }}>
                    Log in
                </Link>
            </Box>
            }
        </div>
    )
}

export default Dashboard;