import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import path from 'path';
import { uniqueEmail } from '../src/utils/emailUtil';
import { CsvHelper } from '../src/utils/CsvHelper';

const users = CsvHelper.readCsv(
 path.resolve('src/testdata/registerdata.csv')
);

let loginPage: LoginPage;
let registerPage:RegisterPage;


test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    registerPage = new RegisterPage(page);
    await page.getByRole('link', { name: 'Register' }).click();
   
});

for (const u of users) {
  test(`user is able to register: ${u.firstname}`, async ({ page }) => {
    await registerPage.fillRegisterForm(
      u.firstname, u.lastname, uniqueEmail(u.email),
      u.telephone, u.password, u.confirmpassword
    );
    await expect(
      page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 })
    ).toBeVisible();
  });
}

test.skip('user is able to register to app', async ({ page }) => {
    await registerPage.fillRegisterForm('John','B','johnb@pw.com','7867567456','test@123','test@123');
    let mesg = await page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 }).textContent();
    expect(mesg).toEqual('Your Account Has Been Created!');
});

