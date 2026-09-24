
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
});


let testCSVData = CsvHelper.readCsv('src/testdata/product.csv');
for (let row of testCSVData) {
    test(`verify product header - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, productInfoPage }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        expect(await productInfoPage.getProductHeader()).toBe(row.productname)
    });
}

for (let row of testCSVData) {
    test(`verify product images count - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, productInfoPage }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        expect(await productInfoPage.getProductImagesCount()).toBe(Number(row.imagescount));
    });

}

let testCSVProdData = CsvHelper.readCsv('src/testdata/productdata.csv');
for (let row of testCSVProdData) {

    test(`verify product information/data  - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, productInfoPage }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);

        let actualProductInfoMap = await productInfoPage.getProductInfo();
        console.log('Actual Product Details: ', actualProductInfoMap);
        
        expect.soft(actualProductInfoMap.get('productheader')).toBe(row.productheader);
        expect.soft(actualProductInfoMap.get('productimagescount')).toBe(Number(row.imagecount));

        expect.soft(actualProductInfoMap.get('Brand')).toBe(row.brand);
        expect.soft(actualProductInfoMap.get('Product Code')).toBe(row.productcode);
        expect.soft(actualProductInfoMap.get('Reward Points')).toBe(row.rewardpoints);
        expect.soft(actualProductInfoMap.get('Availability')).toBe(row.availability);

        expect.soft(actualProductInfoMap.get('productprice')).toBe(row.productprice);
        expect.soft(actualProductInfoMap.get('extaxprice')).toBe(row.extraprice);

        //await page.pause();
    });

}

for (let row of testCSVData) {
    test(`add to cart - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, productInfoPage, page }) => {

        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        await productInfoPage.addToCart();
        let successAlert = page.locator('#product-product > div.alert.alert-success:nth-of-type(1)');
        await expect(successAlert).toHaveText(`Success: You have added ${row.productname} to your shopping cart!×`);
        await productInfoPage.shoppingCartNavigation();
    });
}