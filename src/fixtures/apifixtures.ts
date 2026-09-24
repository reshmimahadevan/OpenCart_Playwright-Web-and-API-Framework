import { test as baseTest } from '@playwright/test';
import { ApiHelper } from '../api/ApiHelper';
import { BookerHelper } from '../api/BookerHelper';


//define types for API fixtures:
type ApiFixtures = {
    apiHelper: ApiHelper,
    bookerHelper: BookerHelper
}


export let test = baseTest.extend<ApiFixtures>({
    
    apiHelper: async ({ request }, use) => {
        let apiHelper = new ApiHelper(request, process.env.API_BASE_URL!);
        await use(apiHelper);
    },

    bookerHelper: async ({ request }, use) => {
        let bookerHelper = new BookerHelper(request, process.env.BOOKER_BASE_URL!);
        await use(bookerHelper);
    }
})

export { expect } from '@playwright/test';
