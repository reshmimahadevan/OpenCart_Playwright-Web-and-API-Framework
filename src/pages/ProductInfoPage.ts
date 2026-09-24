
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    //private locators:
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly quantity : Locator;
    private readonly addToCartBtn : Locator;
    private readonly shoppingCartLink : Locator;
    private productInfoMap: Map<string, string | number>;


    //const... of the class....init the locators:
    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        //getByRole -> giving logo image as well so stricly restricting by css
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.quantity = page.getByRole('textbox', { name: 'Qty' });
       this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart', exact: true });
        this.shoppingCartLink = page.locator('#product-product > div.alert.alert-success:nth-of-type(1) a:nth-of-type(2)');
        this.productInfoMap = new Map<string, string | number>();
    }


    //page actions:
    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        //Waiting for the images as what if its loaded very slowly
        //Safer side using this
        await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();
    }


    async getProductInfo(): Promise<Map<string, string | number>> {
        this.productInfoMap.set('productheader', await this.getProductHeader());
        this.productInfoMap.set('productimagescount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.productInfoMap;
    }

    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
   private async getProductMetaData(): Promise<void> {
    let metaData = await this.productMetaData.allInnerTexts();
    for (let data of metaData) {
        let meta = data.split(':');
        let metaKey = meta[0].trim();
        let metaValue = meta[1]?.trim() || 'N/A';
        this.productInfoMap.set(metaKey, metaValue);
    }

    // Handle keys that don't render on the page at all (e.g. Reward Points missing entirely)
    const expectedKeys = ['Brand', 'Product Code', 'Reward Points', 'Availability'];
    for (let key of expectedKeys) {
        if (!this.productInfoMap.has(key)) {
            this.productInfoMap.set(key, 'N/A');
        }
    }
}

    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPriceData(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.productInfoMap.set('productprice', productPrice);
        this.productInfoMap.set('extaxprice', exTaxPrice);
    }

    async addToCart() : Promise<void> {
        await this.quantity.fill('1');
        await this.addToCartBtn.click();

    }

    async shoppingCartNavigation () :Promise<void> {
        await this.shoppingCartLink.click();
    }
 
}