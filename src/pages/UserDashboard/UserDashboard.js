import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './UserDashboard.css';

function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-menu">
        <button className="user-icon" onClick={handleChangePassword}>
          👤 Redefinir Senha
        </button>
      </div>
      <div className="welcome-box">
        <h2>Hola Mundo!</h2>
        <p>Bem-vindo, {user?.name || 'Usuário'}!</p>
        </div>
        <button onClick={handleLogout} className="btn-primary">Sair</button>
    </div>
  );
}

export default UserDashboard;