// import { test, expect } from '../src/fixtures/pagefixtures';
// import { RegisterPage } from '../src/pages/RegisterPage';
// import { CsvHelper } from '../src/utils/CsvHelper';

// let registerPage:RegisterPage;

// test.beforeEach(async ({ loginPage, registerPage, page }) => {
//     await loginPage.goToLoginPage();
//     registerPage = new RegisterPage(page);
//     await page.getByRole('link', { name: 'Register' }).click();
// });

// test.skip('user is able to register to app', async ({ registerPage, page }) => {
//     await registerPage.fillRegisterForm('Bob','Hardley','bh@gmail.com','8765431209','bh@123','bh@123');
//     let mesg = await page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 }).textContent();
//     expect(mesg).toEqual('Your Account Has Been Created!');
// });

// let testCSVData = CsvHelper.readCsv('src/testdata/registerdata.csv');
// //3 sets of data is present in logindata.csv do testname is duplicated so adding row.username and row.password
// for (let row of testCSVData) {
//     test(`register to app with CSV data - ${row.firstname} - ${row.lastname}`, async ({registerPage,page}) => {
//         await registerPage.fillRegisterForm(row.firstname, row.lastname,row.email,row.telephone,row.password,row.confirmpassword);
//         let mesg = await page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 }).textContent();
//         expect(mesg).toEqual('Your Account Has Been Created!');
//     });
// };

import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { uniqueEmail } from '../src/utils/emailUtil';

test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goToLoginPage();
    await page.getByRole('link', { name: 'Register' }).click();
});

test.skip('user is able to register to app', async ({ registerPage, page }) => {
    await registerPage.fillRegisterForm('Bob', 'Hardley', 'bh@gmail.com', '8765431209', 'bh@123', 'bh@123');
    const mesg = await page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 }).textContent();
    expect(mesg).toEqual('Your Account Has Been Created!');
});

const testCSVData = CsvHelper.readCsv('src/testdata/registerdata.csv');

// Test names include firstname and lastname so they stay unique across the 3 CSV rows
for (const row of testCSVData) {
    test(`register to app with CSV data - ${row.firstname} - ${row.lastname}`, async ({ registerPage, page }) => {
        await registerPage.fillRegisterForm(
            row.firstname,
            row.lastname,
            uniqueEmail(row.email),   // fresh email every run
            row.telephone,
            row.password,
            row.confirmpassword
        );
        await expect(
            page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 })
        ).toBeVisible();
    });
}