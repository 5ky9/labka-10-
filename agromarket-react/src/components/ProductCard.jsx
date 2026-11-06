import React from 'react';

export default function ProductCard({ product, onAdd }) {
  const isOutOfStock = product.stock === 0;

  return (
    <div data-testid="product-card" className="product-card">
      <h3>{product.name}</h3>
      <p>Категория: <span>{product.category}</span></p>
      <p>Цена: <span>{product.price.toLocaleString('ru-RU')} ₸</span></p>
      {product.farmer && <p>Продавец: {product.farmer}</p>}
      {isOutOfStock && <p className="error">нет в наличии</p>}
      <button 
        disabled={isOutOfStock} 
        onClick={() => onAdd && onAdd(product)}
      >
        {isOutOfStock ? 'нет в наличии' : 'В заявку'}
      </button>
    </div>
  );
}
