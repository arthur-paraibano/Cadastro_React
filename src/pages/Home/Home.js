import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Hola Mundo</h1>
      <p>Bem-vindo, {user.name}!</p>
      <button onClick={() => navigate('/change-password')}>Trocar Senha</button>
      {user.role === 'Administrador' && (
        <button onClick={() => navigate('/admin/users')}>Gerenciar Usuários</button>
      )}
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Home;