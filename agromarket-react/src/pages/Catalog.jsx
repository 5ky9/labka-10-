import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка сервера');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Не удалось загрузить данные');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Не удалось загрузить товары: {error}</div>;
  if (products.length === 0) return <div>Товаров пока нет</div>;

  return (
    <div>
      <h2>Каталог товаров</h2>
      <div className="product-list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
