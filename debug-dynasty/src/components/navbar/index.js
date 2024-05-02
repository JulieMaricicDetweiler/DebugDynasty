import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Container, Button, Toolbar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext/authContext';
import firebaseConfig from '../../firebase/firebaseConfig';

function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        firebaseConfig.auth.signOut().then(() => {
            console.log("Sign out successful");
            navigate("/login");
        }).catch((error) => {
            console.log("Error signing out", error);
        });
    };

    return (
        <AppBar position="fixed" sx={{ background: '#F5FEFD', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', height: '64px', display: 'flex' }}>
            <Container maxWidth="xl" sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ height: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5em", textDecoration: "none", color: 'var(--black-green)', fontFamily: 'Poppins' }}>
                    Home
                </Link>
                <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "2em" }}>
                        {!isMobile && (
                            <div>
                                <Button
                                    size="large"
                                    style={{ fontFamily: "Poppins", fontSize: 'medium', color: "var(--black-green)" }}
                                    aria-controls="project-menu"
                                    aria-haspopup="true"
                                    onMouseOver={handleMenu}
                                >
                                    Project
                                </Button>
                                <Menu
                                    id="project-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{ onMouseLeave: handleClose }}
                                >
                                    <MenuItem 
                                    onClick={handleClose} 
                                    component={Link} to="/project" 
                                    style={{fontSize: 'small', fontFamily: 'Poppins', color: 'var(--black-green)'}}>
                                        Project Dashboard
                                    </MenuItem>
                                    <MenuItem 
                                    onClick={handleClose} 
                                    component={Link} to="/register" 
                                    style={{fontSize: 'small', fontFamily: 'Poppins', color: 'var(--black-green)'}}>
                                        Register New Project
                                    </MenuItem>
                                    <MenuItem 
                                    onClick={handleClose} 
                                    component={Link} to="/addMe"
                                    style={{fontSize: 'small', fontFamily: 'Poppins', color: 'var(--black-green)'}}>
                                        Add Myself to Project
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                        {!isMobile && (
                            <Link to="/docs" style={{ textDecoration: "none" }}>
                                <Button size="large" style={{ fontFamily: "Poppins", fontSize: 'medium', color: 'var(--black-green)'}}>
                                    Docs
                                </Button>
                            </Link>
                        )}
                        <Link to="/dashboard" style={{ textDecoration: "none" }}>
                            <Button size="large" style={{ fontFamily: "Poppins", fontSize: 'medium', color: 'var(--black-green)' }}>
                                Dashboard
                            </Button>
                        </Link>
                        {currentUser ? (
                            <Button
                                size="large"
                                onClick={handleSignOut}
                                style={{ fontFamily: "Poppins", fontSize: 'medium', backgroundColor: "var(--dark-green)", color: "white", borderRadius: 3 }}
                                variant="contained"
                            >
                                Sign Out
                            </Button>
                        ) : (
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button
                                    size="large"
                                    style={{ fontFamily: "Poppins", fontSize: 'medium', backgroundColor: "var(--dark-green)", color: "white", borderRadius: 3 }}
                                    variant="contained"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </Toolbar>
                </Container>
            </Container>
        </AppBar>
    );
}

export default Navbar;
