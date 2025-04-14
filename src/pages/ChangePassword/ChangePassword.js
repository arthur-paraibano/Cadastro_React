import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { updatePassword } from '../../services/api';
import './ChangePassword.css';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
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
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const updatedUser = {
        id: user.id,
        name: user.name,
        password: newPassword,
      };
      const res = await updatePassword(updatedUser);
      console.log('Senha atualizada:', res.data);

      logout();
      console.log('Logout realizado, redirecionando para /login');
      navigate('/login');
    } catch (err) {
      console.error('Erro ao atualizar senha:', err.response?.data);
      setError(err.response?.data?.message || 'Erro ao atualizar a senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="change-password-container">
        <div className="user-menu">
          <button className="user-icon" onClick={toggleMenu}>
            👤 Menu
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
              <button onClick={handleBack} className="dropdown-item">
                Voltar
              </button>
              <button onClick={handleLogout} className="dropdown-item">
                Sair
              </button>
            </div>
          )}
        </div>
        <div className="change-password-box">
          <h2>Redefinir Senha</h2>
          <p>Digite e confirme sua nova senha abaixo.</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="newPassword">Nova Senha</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                required
                disabled={loading}
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua nova senha"
                required
                disabled={loading}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Carregando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;