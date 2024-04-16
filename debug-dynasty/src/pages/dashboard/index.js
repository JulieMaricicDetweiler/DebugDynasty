const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 style={{textAlign: "center", fontFamily: "sans-serif"}}>Dashboard</h1>
            <div className="issues-box-container">
                 <h2 style={{textAlign: "center", fontFamily: "sans-serif"}}>Issues</h2>
                 <div className="bug1">
                    <div className="bug1-box1"><p>    .    </p></div>
                    <div className="bug1-box2"><p>    .    </p></div>
                    <div className="bug1-box3"><p>    .    </p></div>
                 </div> <hr></hr>
                 <div className="bug2">
                    <div className="bug2-box1"><p>    .    </p></div>
                    <div className="bug2-box2"><p>    .    </p></div>
                    <div className="bug2-box3"><p>    .    </p></div>
                 </div> <hr></hr>
                 <div className="bug3">
                    <div className="bug3-box1"><p>    .    </p></div>
                    <div className="bug3-box2"><p>    .    </p></div>
                    <div className="bug3-box3"><p>    .    </p></div>
                 </div> <hr></hr>
                 <button>Create</button>
            </div>

            <div className="git-popup-container">
                <div className="repo-name"><p> . </p></div>
                <div className="client-id"><p> . </p></div>
                <div className="client-server"><p> . </p></div>
                <div className="token"></div>
                <button>Go</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}

export default Dashboard;