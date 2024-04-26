import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Toolbar, Typography, SvgIcon, hexToRgb } from '@mui/material';
import { ReactComponent as MainLogo } from '../../assets/logo-final.svg';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { AuthContext } from '../authContext/authContext';
import firebaseConfig from '../../firebase/firebaseConfig';

function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();
    const { currentUser } = React.useContext(AuthContext);


    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    //Detect screen size for responsive layout
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSignOut = () => {
        firebaseConfig.auth.signOut(firebaseConfig.auth).then(() => {
          console.log("Sign out successful");
          navigate("/login");
        }).catch((error) => {
          console.log("Error signing out");
        });
      }

    return (
        <AppBar position="fixed" sx={{ background: '#F5FEFD', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', height: '64px', display: 'flex' }}>
            <Container maxWidth="false" sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ height: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5em", textDecoration: "none", color: 'black'}}>
                    {/*<SvgIcon component={MainLogo} fontSize={"large"} inheritViewBox />*/}
                    Home
                </Link>

                <Container maxWidth="m" sx={{ display: "flex", alignItems: "center", justifyContent: "end"}}>
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between",  alignItems: "center", columnGap: "2em" }}>
                        {!isMobile && (
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Button size="large" style={{ fontFamily: "helvetica", color: "black", fontSize: 'large' }}>
                                About
                            </Button>
                        </Link>)}

                        {!isMobile && 
                        (<Link to="/dashboard" style={{ textDecoration: "none" }}>
                            <Button size="large" style={{ fontFamily: "helvetica", fontSize: 'large', color: "black" }}>
                                Dashboard
                            </Button>
                        </Link>)}
                        
                        {currentUser ?
                            <Button size="large" onClick={handleSignOut} style={{ fontFamily: "helvetica", fontSize: 'large', backgroundColor: hexToRgb("#155426"), borderRadius: 0 }} variant="contained">
                                Sign Out
                            </Button>
                            :
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button size="large" style={{ fontFamily: "helvetica", fontSize: 'large', backgroundColor: hexToRgb("#155426"), borderRadius: 0 }} variant="contained">
                                    Login
                                </Button>
                            </Link>
                        }
                        
                    </Toolbar>
                </Container>
            </Container>
        </AppBar>
    );
}

export default Navbar;