import { test, expect } from '@playwright/test';

const email = `e2e+${Date.now()}@agromarket.test`;
const password = 'E2e-Test-Password-123';

test('каталог загружается с сервера', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/АгроМаркет/i);
  await expect(page.getByTestId('product-card').first()).toBeVisible();
});

test('прямая ссылка на внутреннюю страницу не даёт 404', async ({ page }) => {
  const response = await page.goto('/login');
  expect(response.status()).toBe(200);
});

test('покупатель регистрируется, входит и оформляет заявку', async ({ page }) => {
  await page.goto('/register');
  await page.getByLabel(/имя/i).fill('E2E Покупатель');
  await page.getByLabel(/e-?mail|почта/i).fill(email);
  await page.getByLabel(/пароль/i).first().fill(password);
  await page.getByRole('button', { name: /зарегистр/i }).click();

  await expect(page.getByText(/выйти|профиль/i)).toBeVisible();

  await page.goto('/');
  await page.getByRole('button', { name: /в заявку|добавить/i }).first().click();
  await page.goto('/order');
  await page.getByRole('button', { name: /оформить/i }).click();

  await expect(page.getByText(/успешно|создана/i)).toBeVisible();
});

test('гость открывает /admin -> перенаправляет на /login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/login/);
});
