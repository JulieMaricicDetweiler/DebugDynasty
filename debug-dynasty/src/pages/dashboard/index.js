import * as React from 'react';
import firebaseConfig from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/authContext/authContext";


const Dashboard = () => {

    const [authUser, setAuthUser] = React.useState(null);
    const { currentUser } = React.useContext(AuthContext);
    const navigate = useNavigate;

    const handleSignOut = () => {
        firebaseConfig.auth.signOut(firebaseConfig.auth).then(() => {
          console.log("Sign out successful");
          setAuthUser(null);
        }).catch((error) => {
          console.log("Error signing out");
        });
      }

    return (
        <div className="dashboard-container">
            <h1 style={{textAlign: "center", fontFamily: "sans-serif"}}>Dashboard</h1>
            <div className="issues-box-container">
                 <h2 style={{textAlign: "center", fontFamily: "sans-serif"}}>Issues</h2>
                 <div className="bug1">
                    <div className="bug1-box1"><p>    l    </p></div>
                    <div className="bug1-box2"><p>    k    </p></div>
                    <div className="bug1-box3"><p>    j    </p></div>
                 </div> <hr></hr>
                 <div className="bug2">
                    <div className="bug2-box1"><p>    l    </p></div>
                    <div className="bug2-box2"><p>    k    </p></div>
                    <div className="bug2-box3"><p>    j    </p></div>
                 </div> <hr></hr>
                 <div className="bug3">
                    <div className="bug3-box1"><p>    l    </p></div>
                    <div className="bug3-box2"><p>    k    </p></div>
                    <div className="bug3-box3"><p>    j    </p></div>
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

            {currentUser ? 
                <div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            :
                <></>
            }
        </div>
    )
}

export default Dashboard;