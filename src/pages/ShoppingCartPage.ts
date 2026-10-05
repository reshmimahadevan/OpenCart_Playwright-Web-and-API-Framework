import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {

    private readonly productName: Locator;
    private readonly quantity: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page
            .locator('#content table.table')
            .getByRole('link', { name: 'MacBook Pro' })
            .filter({ hasText: 'MacBook Pro' });
        this.quantity = page
            .locator('#content table.table')
            .getByRole('textbox');

    }

    async validation(): Promise<void> {

        await expect(this.productName).toBeVisible();
        await expect(this.quantity).toHaveValue('1');

    }


    //Makin cart products every time to 0 and adding to cart so always the quantity is 1
    async clearCart() {

        await this.page.goto('/opencart/index.php?route=checkout/cart');

        const removeButton = this.page
            .locator('#content table.table tbody tr')
            .first()
            .locator('button[title="Remove"], button[data-original-title="Remove"]');

        while (await this.page.locator('#content table.table tbody tr').count() > 0) {
        //while (await removeButton.count() > 0) {
            await removeButton.click();
            await this.page.waitForLoadState('networkidle');
        }
    }

}   