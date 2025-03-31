import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { updatePassword } from '../../services/api';
import './ChangePassword.css';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

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
    }
  };

  return (
    <div className="change-password-container">
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
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-primary">Salvar</button>
            <button onClick={handleLogout} className="btn-primary">Sair</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;