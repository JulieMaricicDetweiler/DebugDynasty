import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircle from '@mui/icons-material/CheckCircle';

const DisplayIssues = ({ issues, editMode, selectedIssues, toggleIssueSelection }) => {
    return (
        <>
            {issues.map((issue) => (
                <Accordion key={issue.id} style={{ marginBottom: '15px', backgroundColor: issue.status !== 'Open' ? '#76aecf' :(editMode && selectedIssues.includes(issue.id) ? 'var(--selected-accordion)' : 'var(--accordion)') }} disableGutters>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleIssueSelection(issue.id)}
                    >
                        <Typography style={{ fontSize: 'large', fontFamily: 'Poppins' }}>
                            {selectedIssues.includes(issue.id) ? 
                                editMode && <CheckCircle style={{ marginRight: '30px', cursor: 'pointer', fontSize: '30px', verticalAlign: 'middle' }} /> :
                                editMode && <CheckCircleOutlineIcon style={{ marginRight: '30px', cursor: 'pointer', fontSize: '30px', verticalAlign: 'middle' }} />
                            }
                            {issue.id} - {issue.title}
                            <ExpandMoreIcon style={{ fontSize: '25px', cursor: 'pointer', verticalAlign: 'middle' }} />
                        </Typography>
                    </AccordionSummary>
                    {!editMode && (
                        <AccordionDetails>
                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins' }}>
                                <strong>Description:</strong> {issue.description}
                            </Typography>

                            {issue.fromUser &&
                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins' }}>
                                <strong>Originated from user: </strong> {issue.reporter}
                            </Typography>
                            }

                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins' }}>
                                <strong>Tags:</strong> {issue.tags.join(", ")}
                            </Typography>

                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins' }}>
                                <strong>Time Stamp:</strong> {issue.time}
                            </Typography>

                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins' }}>
                                <strong>Status:</strong> {issue.status}
                            </Typography>

                        </AccordionDetails>
                    )}
                </Accordion>
            ))}
        </>
    );
}

export default DisplayIssues;
