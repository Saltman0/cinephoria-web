import {test, expect, Locator} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/home');
});

test('Home page', async ({ page }) => {
    await page.goto('http://localhost:4200/home');

    await expect(page.getByText('Dernières affiches')).toBeVisible();
    await expect(page.getByText('Coups de coeur')).toBeVisible();
});

test('Booking page', async ({ page }) => {
    await page.goto('http://localhost:4200/booking');

    const cinemaSelect: Locator = page.locator('select[name="cinema"]');
    await expect(cinemaSelect).toBeVisible();
    await cinemaSelect.selectOption('1');

    const firstMovieImage: Locator = page.locator('img.cinephoria-movie-image').first();
    await expect(firstMovieImage).toBeVisible();
    await firstMovieImage.click();

    const bookButton: Locator = page.locator('button.book-button').first();
    await expect(bookButton).toBeVisible();
    await bookButton.click();

    const selectedSeat: Locator = page.getByRole('img', { name: 'B1' }).first();
    await expect(selectedSeat).toBeVisible();
    await selectedSeat.click();

    const confirmBookButton: Locator = page.locator('button[id="confirm-book-button"]');
    await expect(confirmBookButton).toBeVisible();
    await confirmBookButton.click();
});

test('Movies page', async ({ page }) => {
    await page.goto('http://localhost:4200/home');

    const moviesLink: Locator = page.getByRole('link', { name: 'Films' });
    await expect(moviesLink).toBeVisible();
    await moviesLink.click();

    const cinemaSelect: Locator = page.locator('select[name="cinema"]');
    await expect(cinemaSelect).toBeVisible();
    await cinemaSelect.selectOption('1');

    const categoryIdSelect: Locator = page.locator('select[name="categoryId"]');
    await expect(categoryIdSelect).toBeVisible();
    await categoryIdSelect.selectOption('5');

    const searchButton: Locator = page.getByRole('button', { name: 'Rechercher' });
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    const firstMovieImage: Locator = page.locator('img.cinephoria-movie-image').first();
    await expect(firstMovieImage).toBeVisible();
    await firstMovieImage.click();

    const bookButton: Locator = page.getByRole('button', { name: 'Réserver' });
    await expect(bookButton).toBeVisible();
    await bookButton.click();
});

test('Contact page', async ({ page }) => {
    await page.goto('http://localhost:4200/contact');

    const contactEmailInput: Locator = page.locator('input[id="contactEmail"]');
    await expect(contactEmailInput).toBeVisible();
    await contactEmailInput.fill('baudoin.mathieu@protonmail.com');

    const contactTitleInput: Locator = page.locator('input[id="contactTitle"]');
    await expect(contactTitleInput).toBeVisible();
    await contactTitleInput.fill('Help me');

    const contactDescriptionInput: Locator = page.locator('textarea[id="contactDescription"]');
    await expect(contactDescriptionInput).toBeVisible();
    await contactDescriptionInput.fill('Help me');

    const sendButton: Locator = page.getByRole('button', { name: "Envoyer" });
    await expect(sendButton).toBeVisible();
    await sendButton.click();
});