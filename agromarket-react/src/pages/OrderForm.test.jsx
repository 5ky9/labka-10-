import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import OrderForm from './OrderForm';

describe('OrderForm с авторизацией', () => {
  test('отправляет заголовок Authorization в fetch', async () => {
    const user = userEvent.setup();
    localStorage.setItem('token', 'test-token');

    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    render(
      <MemoryRouter>
        <OrderForm />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /оформить|отправить/i });
    await user.click(submitBtn);

    expect(spy).toHaveBeenCalled();
    const [, options] = spy.mock.calls[0];
    const authHeader = options.headers instanceof Headers 
      ? options.headers.get('Authorization') 
      : options.headers.Authorization;
      
    expect(authHeader).toBe('Bearer test-token');
  });

  test('при ответе 401 показывает ошибку авторизации', async () => {
    localStorage.setItem('token', 'expired-token');

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    );

    render(
      <MemoryRouter>
        <OrderForm />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /оформить/i }));

    expect(await screen.findByText(/войдите заново|авторизуйтесь/i)).toBeInTheDocument();
  });
});
