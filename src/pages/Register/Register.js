import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    id: 0,
    name: '',
    email: '',
    password: '',
    cpf: '',
    profile: 'Usuário',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      console.error('Erro ao cadastrar:', err.response?.data);
      const errorMessage = err.response?.data?.message || 'Erro ao cadastrar. Verifique os dados.';
      setError(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Cadastro</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
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
          </div>
          <div className="input-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="profile">Perfil</label>
            <select id="profile" name="profile" value={form.profile} onChange={handleChange}>
              <option value="Usuário">Usuário</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Cadastrar</button>
        </form>
        <p className="login-link">
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;