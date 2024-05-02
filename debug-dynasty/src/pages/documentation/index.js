import * as React from 'react';
import { Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import '../../colors.css';

const Documentation = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="md" style={{ paddingTop: '90px', paddingBottom: '30px'}}>
            <Typography variant="h4" style={{ color: 'var(--dark-green)', textAlign: 'center', fontSize: isMobile ? '28px' : '50px', fontFamily: 'Poppins' }}>
                API Documentation
            </Typography>
            <hr style={{ margin: '20px auto', borderColor: 'var(--dark-green)', maxWidth: '100%', height: '1px', fontFamily: 'Poppins' }} />
            <Box paddingTop={'30px'}>
                <Box>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px', fontFamily: 'Poppins' }}>
                        Overview
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '20px', fontFamily: 'Poppins' }}>
                        Our issue submission API allows developers to programmatically report user-submitted issues from their 
                        applications to the centralized issue tracking dashboard. Simply create a POST request to the endpoint 
                        upon your user's bug submission and watch as your issue tracking is streamlined before your eyes.
                        The documentation below provides all necessary details to integrate the API into your product.
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px', fontFamily: 'Poppins' }}>
                        Endpoint
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '20px', fontFamily: 'Poppins' }}>
                        POST https://us-central1-your-project-id.cloudfunctions.net/submitIssue
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px', fontFamily: 'Poppins'}}>
                        Request Parameters
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '18px', fontFamily: 'Poppins' }}>
                        - title: String (required)<br/>
                        - description: String (required)<br/>
                        - reporter: String (required)<br/>
                        - severity: String (required, options: 'low', 'medium', 'high')<br/>
                        - projectToken: String (required, provided by your project registration)
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px', fontFamily: 'Poppins' }}>
                        Response Codes/Payloads
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '18px', fontFamily: 'Poppins'}}>
                        - 201 Created: Successful creation of an issue.<br/>
                        <pre style={{ background: 'var(--code-snippet-bkg)', color: 'var(--light-text)', padding: '10px', fontSize: isMobile ? '14px' : '16px', borderRadius: '5px', overflowX: 'auto', marginTop: '10px', marginBottom: '10px'}}>
{`{
    "id": "issue_id",
    "title": "string",
    "description": "string",
    "reporter": "string",
    "severity": "string",
    "status": 'Open',
    "timestamp": "ISO date-time string",
    "fromUser": true
}`}
                        </pre>
                        - 400 Bad Request: Required fields are missing or the request format is incorrect.<br/>
                        - 404 Not Found: The specified project token does not correspond to any existing project.<br/>
                        - 500 Internal Server Error: An error occurred on the server.
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px', fontFamily: 'Poppins'}}>
                        Example Request
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '18px', fontFamily: 'Poppins'}}>
                        Here is an example of how to make a request using JavaScript's Fetch API:
                        <pre style={{ background: 'var(--code-snippet-bkg)', padding: '10px', fontSize: isMobile ? '14px' : '16px', color: 'var(--light-text)', borderRadius: '5px', overflowX: 'auto', marginTop: '10px'}}>
{`fetch('https://us-central1-your-project-id.cloudfunctions.net/submitIssue', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'Login Failure',
        description: 'User unable to login using OAuth2',
        reporter: 'user@example.com',
        severity: 'high',
        projectToken: 'your_project_token_here'
    })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));`}
                        </pre>
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px', fontFamily: 'Poppins' }}>
                        Testing Submission on Mock Project
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '20px', fontFamily: 'Poppins' }}>
                        For testing convenience, we have set up a form on Julie's senior project live link in order to test
                        our endpoint. Since the site is already deployed, there is no need to download any additional code.
                        Simply follow the directions below to test.
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '20px', fontFamily: 'Poppins'}}>
                        1. Create an account through the <a href="/signUp" style={{fontSize: 'large', marginRight: '1px'}}>signup portal</a> using the following project token: <i>L3zYcBBKKEeT3FtkFlwN</i><br/>
                        <br/>
                        2. Visit the following link to access the submission form: <br/>
                        <a href="https://sightbyte-b9325.web.app/testEndpoint" target="_blank" style={{fontSize: 'large'}}><i>https://sightbyte-b9325.web.app/testEndpoint</i></a><br/>
                        <br/>
                        3. Enter your desired information into the issue fields and submit <br/>
                        <br/>
                        4. If successful, you should be able to go back to the <a href="/project" style={{fontSize: 'large', marginRight: '1px'}}>project dashboard</a> and see your issue posted under "Unassigned Issues"
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Documentation;
