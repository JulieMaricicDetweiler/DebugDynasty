import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Button from "../UI-Button/Button.js";

const Home = () => {
    const headerBugURL = process.env.PUBLIC_URL + '/header-bug.jpg';
    return (
        <section id="header" className="header-bg" style={{
            backgroundImage: `linear-gradient(rgba(0, 50, 20, 0.8), rgba(0, 50, 20, 0.8)), url(${headerBugURL})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'relative'
            }}>
            <div className="header-container">
                <h1><span>Simplifying the debugging process,</span> <span>one report at a time</span></h1>
                <p className="u-text-small u-text-light">At DebugDynasty, we offer a sophisticated and user-friendly platform designed to streamline the management of bug reports and user feedback for software developers. 
                    Our solution provides an automated process for efficiently tracking application issues, freeing up valuable time and resources.</p>
            </div>
            <div className="header-buttons">
                <Button text={"Get Started"} btnClass={"btn-dark"} href={"#"} />
                <Button text={"How It Works"} btnClass={"btn-green"} href={"#faq"} />
            </div>
        </section>
        /*
        <section id="dashboard-info">
            <div className="dashboard-container">
                <div className="dashboard-container-left">
                    <h2></h2>
                </div>
            </div>
        </section>
        */
    )
}

export default Home;