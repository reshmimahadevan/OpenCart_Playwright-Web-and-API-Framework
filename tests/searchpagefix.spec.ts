
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.LOGIN_EMAIl!, process.env.LOGIN_PASSWORD!);
});


//data provider:
let productData = CsvHelper.readCsv('src/testdata/product.csv');
for (let row of productData) {
    test(`verify search results count - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage }) => {
        await homePage.doSearch(row.searchkey);
        let actResultCount = await searchResultsPage.getProductSearchResultsCount();
        console.log('Search Results Count: ', actResultCount);
        expect(actResultCount).toBe(Number(row.resultcount));
    });
}

for (let row of productData) {
    test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, page }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
    });
}