import * as React from 'react';
import { Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';

const Documentation = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="md" style={{ paddingTop: '90px', paddingBottom: '30px' }}>
            <Typography variant="h4" style={{ color: 'var(--dark-green)', textAlign: 'center', fontSize: isMobile ? '28px' : '50px' }}>
                API Documentation
            </Typography>
            <hr style={{ margin: '20px auto', borderColor: 'var(--dark-green)', maxWidth: '100%', height: '1px' }} />
            <Box paddingTop={'30px'}>
                <Box>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px' }}>
                        Overview
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '20px' }}>
                        Our issue submission API allows developers to programmatically report user-submitted issues from their 
                        applications to the centralized issue tracking dashboard. Simply create a POST request to the endpoint 
                        upon your user's bug submission and watch as your issue tracking is streamlined before your eyes.
                        The documentation below provides all necessary details to integrate the API into your product.
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px' }}>
                        Endpoint
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '20px' }}>
                        POST https://us-central1-your-project-id.cloudfunctions.net/submitIssue
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px' }}>
                        Request Parameters
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '18px' }}>
                        - title: String (required)<br/>
                        - description: String (required)<br/>
                        - reporter: String (required)<br/>
                        - severity: String (required, options: 'low', 'medium', 'high')<br/>
                        - projectToken: String (required, provided by your project registration)
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px' }}>
                        Response Codes/Payloads
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '18px' }}>
                        - 201 Created: Successful creation of an issue.<br/>
                        <pre style={{ background: 'var(--code-snippet-bkg)', color: 'var(--light-text)', padding: '10px', fontSize: isMobile ? '14px' : '16px', borderRadius: '5px', overflowX: 'auto', marginTop: '10px', marginBottom: '10px'}}>
{`{
    "id": "issue_id",
    "title": "string",
    "description": "string",
    "reporter": "string",
    "severity": "string",
    "status": "Open",
    "timestamp": "ISO date-time string"
}`}
                        </pre>
                        - 400 Bad Request: Required fields are missing or the request format is incorrect.<br/>
                        - 404 Not Found: The specified project token does not correspond to any existing project.<br/>
                        - 500 Internal Server Error: An error occurred on the server.
                    </Typography>
                </Box>
                <Box paddingTop={'30px'}>
                    <Typography variant="h5" style={{ color: 'var(--med-green)', fontSize: isMobile ? '24px' : '30px' }}>
                        Example Request
                    </Typography>
                    <Typography style={{ paddingTop: '20px', fontSize: isMobile ? '16px' : '18px' }}>
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
        reporter: 'developer@example.com',
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
            </Box>
        </Container>
    );
}

export default Documentation;
