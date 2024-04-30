import * as React from 'react';
import {Box, Typography} from '@mui/material'


const Documentation = () => {

    return (
        <Box className="docs-main-box" paddingTop='90px' maxWidth={'70%'} display={'flex'} flexDirection={'column'} margin={'auto'}>
            <Typography style={{fontSize: '50px', fontFamily:'Poppins', color: 'var(--med-green)', textAlign: 'center'}}>
                API Documentation
            </Typography>
            <hr maxWidth='40%'></hr>
            <Box className="docs-description-box" paddingTop={'30px'}>
                <Box className='docs-overview'>
                    <Typography style={{fontSize: '30px', fontFamily:'Poppins', color: 'var(--med-green)', textAlign: 'left'}}>
                        Overview
                    </Typography>
                    <Typography style={{fontSize: '20px', fontFamily:'Poppins', textAlign: 'left', paddingTop: '20px'}}>
                        Our issue submission API allows developers to programmatically report user-submitted issues from their 
                        applications to the centralized issue tracking dashboard. Simply create a POST request to the endpoint 
                        upon your user's bug submission and watch as your issue tracking is streamlined before your eyes.
                        The documentation below provides all necessary details to integrate the API into your product.
                    </Typography>
                </Box>

            </Box>
        </Box>
    )
}

export default Documentation;