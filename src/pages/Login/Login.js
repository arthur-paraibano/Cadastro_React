import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../services/api';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const { token, id, name, email, cpf, profile, firstLogin } = res.data;

      const user = {
        id,
        name,
        email,
        cpf,
        profile,
        firstLogin,
      };

      loginContext(user, token);

      if (firstLogin === true) {
        navigate('/change-password-first', { replace: true });
      } else if (profile === 'ADMINISTRADOR') {
        navigate('/admin/users');
      } else if (profile === 'USUÁRIO') {
        navigate('/user-dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Erro da API:', err.response?.data);
      setError(err.response?.data?.message || 'Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome de Usuário</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome de usuário"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required />
          </div>
          <button type="submit" className="btn-primary">Entrar</button>
        </form>
        <p className="register-link">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;