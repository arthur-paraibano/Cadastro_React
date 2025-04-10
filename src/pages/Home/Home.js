import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
    setIsMenuOpen(false);
  };

  const handleUserList = () => {
    navigate('/admin/users');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-container">
      <div className="user-menu">
        <button className="user-icon" onClick={toggleMenu}> 👤 Menu
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={handleChangePassword} className="dropdown-item">
              Redefinir Senha
            </button>
            {user?.profile === 'ADMINISTRADOR' && (
              <button onClick={handleUserList} className="dropdown-item">
                Lista de Usuários
              </button>
            )}
            <button onClick={handleLogout} className="dropdown-item">
              Sair
            </button>
          </div>
        )}
      </div>
      <div className="home-content">
        <div className="home-message">
          <h2>Hola Mundo!</h2>
          <p>Bem-vindo, {user?.name || 'Usuário'}!</p>
        </div>
      </div>
      <div className="footer-links">
        <a
          href="https://www.linkedin.com/in/arthur-mikael-desenvolvedor/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/arthur-paraibano"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Home;