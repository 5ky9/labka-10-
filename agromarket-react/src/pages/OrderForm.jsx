import React, { useState } from 'react';

export default function OrderForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: [1] })
      });
      if (res.status === 401) {
        setStatus('Войдите заново');
        return;
      }
      if (res.ok) {
        setStatus('Заявка создана успешно');
      } else {
        setStatus('Ошибка создания заявки');
      }
    } catch (err) {
      setStatus('Сетевая ошибка');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Оформление заявки</h2>
      {status && <p>{status}</p>}
      <button type="submit">Оформить заявку</button>
    </form>
  );
}
