import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
