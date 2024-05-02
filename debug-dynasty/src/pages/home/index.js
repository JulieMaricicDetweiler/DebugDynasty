import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Button from "../../components/UI-Button/Button.js";

const Home = () => {
    const headerBugURL = process.env.PUBLIC_URL + '/header-bug.jpg';
    const crowdBugsURL = process.env.PUBLIC_URL + '/crowd-bugs.jpg';
    const githubLogoURL = process.env.PUBLIC_URL + '/github-logo.jpg';

    return (
        <div id="home" className="header-bg" style={{marginTop: '90px'}}>
            <div className="header-container" style={{
            backgroundImage: `linear-gradient(rgba(0, 50, 20, 0.8), rgba(0, 50, 20, 0.8)), url(${headerBugURL})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'relative'
            }}>
                <h1><span style={{fontSize: '65px', paddingTop: '30px'}}>Simplifying the debugging process,</span> <span style={{fonstSize:'50px'}}>one report at a time</span></h1>
                <p className="u-text-small u-text-light">At DebugDynasty, we offer a sophisticated and user-friendly platform designed to streamline the management of bug reports and user feedback for software developers. 
                    Our solution provides an automated process for efficiently tracking application issues, freeing up valuable time and resources.</p>
                <div className="header-buttons">
                    <Button text={"Get Started"} btnClass={"btn-dark"} href={"/login"} />
                    <Button text={"How It Works"} btnClass={"btn-green"} href={"/docs"} />
                </div>
            </div>
            <div className="description-container">
                <div className="description-container-left">
                    <h2><span>A simple dashboard</span> <span>for managing your bugs</span></h2>
                    <p className="u-text-small u-text-dark">Collecting issues and user feedback of applications have never been easier! 
                    When using our plugin for your applications, all issues created by users will be populated through your dashboard. As a developer 
                    you have the power to create, update, and delete your own issues as well as view all issues sent.</p>
                </div>
                <div className="decription-container-right" style={{
                    backgroundImage: `url(${crowdBugsURL})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'relative',
                    width: '50%',
                    height: '100vh',
                }}></div>
            </div>
            <div className="github-container">
                <div className="github-container-left" style={{
                    backgroundImage: `url(${githubLogoURL})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'relative',
                    width: '50%',
                    height: '100vh',
                }}></div>
                <div className="github-container-right">
                    <h2><span>GitHub</span> <span>supported</span></h2>
                    <p className="u-text-small u-text-light">Developers have the option to link issues to their GitHub repository, allowing contributors to help fix bugs for open-source projects. 
                    Simply provide your authentication token and other data to enable the issue endpoints.</p>
                </div>
            </div>
            <footer>
                &copy; Copyright. DebugDynasty Group 13 CIS4930
            </footer>
        </div>
    )
}

export default Home;