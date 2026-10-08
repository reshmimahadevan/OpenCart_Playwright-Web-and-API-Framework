import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { uniqueEmail } from '../src/utils/emailUtil';

test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goToLoginPage();
    await page.getByRole('link', { name: 'Register' }).click();
});

const testCSVData = CsvHelper.readCsv('src/testdata/registerdata.csv');

// Test names include firstname and lastname so they stay unique across the 3 CSV rows
for (const row of testCSVData) {
    test(`@smoke register to app with CSV data - ${row.firstname} - ${row.lastname}`, async ({ registerPage, page }) => {
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