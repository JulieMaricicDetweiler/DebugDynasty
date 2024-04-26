import * as React from 'react';
import firebaseConfig from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/authContext/authContext";
import {Typography, Link, Box, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';


const Dashboard = () => {

    const [authUser, setAuthUser] = React.useState(null);
    const { currentUser } = React.useContext(AuthContext);
    const navigate = useNavigate;
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

    return (
        <div >
            {currentUser ? 
                <Box className="dashboard-container" paddingTop='90px' maxWidth={'70%'} display={'flex'} flexDirection={'column'} margin={'auto'}>
                    <h1 style={{ textAlign: "center", fontFamily: "Poppins", paddingBottom: '50px' }}>Issues Dashboard</h1>
                    {issues.map((issue) => (
                        <Accordion key={issue.id} style={{marginBottom: '15px', backgroundColor: '#b6d4b8'}}>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography style={{fontSize: 'large'}}>{issue.id} - {issue.description}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" style={{fontSize: 'large'}}>
                                    <strong>Tags:</strong> {issue.details.tags.join(", ")}
                                </Typography>
                                <Typography variant="body2" style={{fontSize: 'large'}}>
                                    <strong>Assignee:</strong> {issue.details.assignee}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            :
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