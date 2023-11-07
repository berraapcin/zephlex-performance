import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>Çıkış Yap</h1>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
};

export default Logout;
