import { test, expect } from '@playwright/test';

test('home loads and hero is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('main menu → shop → product → add to cart → cart → checkout', async ({ page }) => {
  await page.goto('/shop');
  await expect(page).toHaveURL(/shop/);
  await page.getByRole('link', { name: /Eco-Friendly Surprise/i }).first().click();
  await expect(page).toHaveURL(/product\//);
  await page.getByRole('button', { name: /Add to cart/i }).first().click();
  await page.goto('/cart');
  await expect(page.getByRole('heading', { name: /Your Cart/i })).toBeVisible();
  await page.getByRole('link', { name: /Checkout/i }).click();
  await expect(page).toHaveURL(/checkout/);
});

test('category page renders', async ({ page }) => {
  await page.goto('/category/bouquets');
  await expect(page.getByRole('heading', { name: /Bouquets/i })).toBeVisible();
});

test('product image opens lightbox and closes with Escape', async ({ page }) => {
  await page.goto('/product/custom-florist-choice');
  await page.locator('.gallery .main').click();
  await expect(page.locator('.lightbox')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.lightbox')).toHaveCount(0);
});

test('admin opens without password in demo mode', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByRole('heading', { name: /Good morning/i })).toBeVisible();
  await page.goto('/admin/orders');
  await expect(page.getByRole('heading', { name: /Orders/i })).toBeVisible();
});

test('deep links work on direct reload', async ({ page }) => {
  await page.goto('/product/elegant-beauty');
  await page.reload();
  await expect(page.getByRole('heading', { name: /Elegant Beauty/i })).toBeVisible();
});
