import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteUser, getAllUsers } from '../../services/api';
import './AdminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err.response?.message);
        setError('Erro ao carregar usuários.');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (id === user.id) {
      setError('Você não pode excluir o usuário atualmente logado.');
      return;
    }
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      setError('');
    } catch (err) {
      console.error('Erro ao excluir usuário:', err.response?.message);
      setError('Erro ao excluir usuário.');
    }
  };

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

  const handleBack = () => {
    navigate('/home');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-users-container">
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
      <div className="admin-content">
        <div className="admin-header">
          <h2>Painel do Administrador</h2>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.cpf}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="btn-delete"
                      disabled={u.id === user.id}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-group">
          <button onClick={handleBack} className="btn-primary">Voltar</button>
          <button onClick={handleLogout} className="btn-primary">Sair</button>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;