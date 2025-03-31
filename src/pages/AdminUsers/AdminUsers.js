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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        console.log('Resposta de /user/all:', res.data);
        setUsers(res.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err.response);
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
      console.error('Erro ao excluir usuário:', err.response?.data);
      setError('Erro ao excluir usuário.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className="admin-users-container">
      <div className="user-menu">
        <button className="user-icon" onClick={handleChangePassword}>
          👤 Redefinir Senha
        </button>
      </div>
      <div className="welcome-box">
        <h2>Painel do Administrador</h2>
      </div>
      {error && <p className="error-message">{error}</p>}
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
      <button onClick={handleLogout} className="btn-primary">Sair</button>
    </div>
  );
}

export default AdminUsers;