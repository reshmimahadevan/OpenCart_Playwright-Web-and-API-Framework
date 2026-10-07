// import { test, expect } from '@playwright/test';
// import path from 'path';
// import { LoginPage } from '../src/pages/LoginPage';
// import { RegisterPage } from '../src/pages/RegisterPage';
// import { uniqueEmail } from '../src/utils/emailUtil';
// import { CsvHelper } from '../src/utils/CsvHelper';

// const users = CsvHelper.readCsv(path.resolve('src/testdata/registerdata.csv'));

// let loginPage: LoginPage;
// let registerPage: RegisterPage;

// test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     await loginPage.goToLoginPage();
//     registerPage = new RegisterPage(page);
//     await page.getByRole('link', { name: 'Register' }).click();
// });

// for (const row of users) {
//     test(`register to app with CSV data - ${row.firstname} - ${row.lastname}`, async ({ page }) => {
//         await registerPage.fillRegisterForm(
//             row.firstname, row.lastname, uniqueEmail(row.email),
//             row.telephone, row.password, row.confirmpassword
//         );
//         await expect(
//             page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 })
//         ).toBeVisible();
//     });
// }

// test.skip('user is able to register to app', async ({ page }) => {
//     await registerPage.fillRegisterForm('John','B','johnb@pw.com','7867567456','test@123','test@123');
//     let mesg = await page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 }).textContent();
//     expect(mesg).toEqual('Your Account Has Been Created!');
// });

