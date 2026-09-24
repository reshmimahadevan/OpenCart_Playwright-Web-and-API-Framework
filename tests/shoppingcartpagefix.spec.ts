    import { test, expect } from '../src/fixtures/pagefixtures';

    test.beforeEach(async ({ loginPage,shoppingCartPage, page }) => {
        await loginPage.goToLoginPage();
        await loginPage.doLogin(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);
        await shoppingCartPage.clearCart(); 
    });

    test('verify product details', async ({ homePage, searchResultsPage, productInfoPage, shoppingCartPage, page }) => {

        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        await productInfoPage.addToCart();
        await productInfoPage.shoppingCartNavigation();
        await shoppingCartPage.validation();
        await page.pause();

    });