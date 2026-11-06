import React, { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Заполните все обязательные поля');
      return;
    }
    if (!email.includes('@')) {
      setError('Некорректный e-mail');
      return;
    }
    setError('');
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход в систему</h2>
      {error && <p role="alert">{error}</p>}
      <div>
        <label htmlFor="email">E-mail / почта</label>
        <input 
          id="email"
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input 
          id="password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit">Войти</button>
    </form>
  );
}
