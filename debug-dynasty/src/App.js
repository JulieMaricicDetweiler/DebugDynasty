import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Documentation from './pages/documentation';
import Register from './pages/registerProject';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
