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
      navigate('/home');
    } catch (err) {
      console.error('Erro da API:', err.response?.data);
      setError(err.response?.data?.message || 'Credenciais inválidas. Tente novamente.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">Tech Login</div>
        <h1>Bem vindo a tela de login de Tech Master.</h1>
        <p>Assuma o controle e cadastresse e explore um pouco das funcionabilidades.</p>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      <div className="right-section">
        <h2>Faça seu Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Usuário</label>
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
              required
            />
            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Esqueceu sua senha?
            </button>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-link">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;