import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {

    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly checkBox: Locator;
    private readonly continueButton: Locator;


    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: '* First Name' });
        this.lastName = page.getByRole('textbox', { name: '* Last Name' });;
        this.email = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone = page.getByRole('textbox', { name: '* Telephone' });
        this.password = page.getByRole('textbox', { name: '* Password', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: '* Password Confirm' });
        this.checkBox = page.locator('[name="agree"]');;
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async fillRegisterForm(fn: string, ln: string, email: string, phoneno: string, password: string, confrmpwd: string): Promise<void> {
        await this.firstName.fill(fn);
        await this.lastName.fill(ln);
        await this.email.fill(email);
        await this.telephone.fill(phoneno);
        await this.password.fill(password);
        await this.confirmPassword.fill(confrmpwd);
        await this.checkBox.click();
        await this.continueButton.click();

    }

}