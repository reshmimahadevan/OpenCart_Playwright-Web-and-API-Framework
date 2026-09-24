import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CsvHelper } from '../utils/CsvHelper';

//repo of page objects -> fixtures
//#1 declares the fixture exists and its type → #2 defines how to build it → #3 is the concrete instance built each time, passed to use() so Playwright can inject it into any test function that destructures basePage from its arguments.
type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    registerPage: RegisterPage,
    searchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfoPage,
    shoppingCartPage: ShoppingCartPage,
    testData: Record<string, string>[];
};

//extend the playwright test: using baseTest.extend: inheritance
export let test = baseTest.extend<pageFixtures>({

    //use -> default export
    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    registerPage: async ({ page }, use) => {
        let registerPage = new RegisterPage(page);
        await use(registerPage);

    },

    searchResultsPage: async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    shoppingCartPage: async ({ page }, use) => {
        let shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage);
    },
    testData: async ({ }, use) => {
        let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
        await use(testCSVData);
    }

});

export { expect } from '@playwright/test';



