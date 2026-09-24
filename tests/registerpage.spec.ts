import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { RegisterPage } from '../src/pages/RegisterPage';


let loginPage: LoginPage;
let registerPage:RegisterPage;


test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    registerPage = new RegisterPage(page);
    await page.getByRole('link', { name: 'Register' }).click();
});

test.skip('user is able to register to app', async ({ page }) => {
    await registerPage.fillRegisterForm('John','B','johnb@pw.com','7867567456','test@123','test@123');
    let mesg = await page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 }).textContent();
    expect(mesg).toEqual('Your Account Has Been Created!');
});

