import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircle from '@mui/icons-material/CheckCircle';

const DisplayIssues = ({ issues, editMode, selectedIssues, toggleIssueSelection }) => {

    function getColor(issue) {
        if (issue.status !== 'Open') {
          return '#858585'; // Color for non-open issues
        }
        else {
            if(issue.severity === 'low') {
                if(editMode && selectedIssues.includes(issue.id)) {
                    return '#67cf6e';
                }
                return 'var(--accordion)';
            } 
            else if(issue.severity === 'medium') {
                if(editMode && selectedIssues.includes(issue.id)) {
                    return '#d6bf40';
                }
                return '#d9cb80';
            } 
            else if(issue.severity === 'high') {
                if(editMode && selectedIssues.includes(issue.id)) {
                    return '#b33030';
                }
                return '#b86054';
            } else{
                if(editMode && selectedIssues.includes(issue.id)) {
                    return 'var(--selected-accordion)';
                }
                return 'var(--accordion)';
            }

        }
    }

    return (
        <>
            {issues.map((issue) => (
                <Accordion key={issue.id} style={{ marginBottom: '15px', backgroundColor: getColor(issue) }} disableGutters>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleIssueSelection(issue.id)}
                    >
                        <Typography style={{ fontSize: 'large', fontFamily: 'Poppins', color: 'var(--black-green)' }}>
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
                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins', color: 'var(--black-green)' }}>
                                <strong>Description:</strong> {issue.description}
                            </Typography>

                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins', color: 'var(--black-green)' }}>
                                <strong>Severity:</strong> {issue.severity}
                            </Typography>

                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins', color: 'var(--black-green)' }}>
                                <strong>Tags:</strong> {issue.tags ? issue.tags.join(", ") : ""}
                            </Typography>


                            {issue.fromUser &&
                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins', color: 'var(--black-green)' }}>
                                <strong>Originated from user: </strong> {issue.reporter}
                            </Typography>
                            }

                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins', color: 'var(--black-green)' }}>
                                <strong>Time Stamp:</strong> {issue.time}
                            </Typography>

                            <Typography variant="body2" style={{ fontSize: 'large', fontFamily: 'Poppins', color: 'var(--black-green)' }}>
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
