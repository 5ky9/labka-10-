import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';

const product = {
  id: 1,
  name: 'Мёд гречишный',
  price: 3500,
  category: 'Мёд',
  farmer: 'КХ «Береке»',
  stock: 10,
};

const outOfStockProduct = {
  ...product,
  id: 2,
  stock: 0,
};

describe('ProductCard', () => {
  test('показывает название, цену и категорию', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('Мёд гречишный')).toBeInTheDocument();
    expect(screen.getByText(/3\s?500/)).toBeInTheDocument();
    expect(screen.getByText('Мёд')).toBeInTheDocument();
  });

  test('кнопка «В заявку» вызывает onAdd с товаром', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<ProductCard product={product} onAdd={onAdd} />);
    await user.click(screen.getByRole('button', { name: /в заявку|добавить/i }));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(product);
  });

  test('при stock = 0 кнопка disabled и выводится «нет в наличии»', () => {
    render(<ProductCard product={outOfStockProduct} />);
    const button = screen.getByRole('button', { name: /нет в наличии|в заявку|добавить/i });
    expect(button).toBeDisabled();
    expect(screen.getByText(/нет в наличии/i)).toBeInTheDocument();
  });
});
