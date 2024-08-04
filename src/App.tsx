import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register'; 
import UploadExcel from './components/UploadExcel';
import ExcelDetail from './components/ExcelDetail';
function App() {
  return (
    <Router>
      <Routes> 
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Main/>}>
          <Route path="logout" element={<Logout />} />
         
          <Route path="uploadexcel" element={<UploadExcel />} />
          <Route path="exceldetail" element={<ExcelDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
