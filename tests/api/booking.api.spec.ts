import { BookerHelper } from '../../src/api/BookerHelper';
import { test, expect } from '../../src/fixtures/apifixtures';

let tokenID: string;

test.beforeEach('generate the token', async ({ bookerHelper }) => {
    let creds = {
        username: 'admin',
        password: 'password123'
    };

    let authResponse = await bookerHelper.post('/auth', creds);
    expect((authResponse).status).toBe(200);
    tokenID = authResponse.body.token;
    console.log('created user id : ', tokenID);


});

test('booking CRUD with token', async ({ bookerHelper, page }) => {

    //1. create a new booking: POST -- no token needed:
    const bookingResponse = await bookerHelper.post('/booking', {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast",

    });

    expect(bookingResponse.status).toBe(200);
    //let bookingJson = await bookingResponse.body.id;
    let bookingID = bookingResponse.body.bookingid;
    console.log('Booking ID: ', bookingID);

    // web automation code:
    // page.goto('');
    // go to the booking page

    //2. Update a booking by bookingID: needs token
    let updatedResponse = await bookerHelper.put(`/booking/${bookingID}`, {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 121,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Lunch"
    }, {
        Cookie: `token=${tokenID}`,
    });

    expect(updatedResponse.status).toBe(200);
    expect(await updatedResponse.body.totalprice).toBe(121);
    expect(await updatedResponse.body.additionalneeds).toBe('Lunch');

    //3.Partially update a booking by bookingId : needs token
    let paritiallyUpdatedResponse = await bookerHelper.patch(`/booking/${bookingID}`, {
        //FN and LN mandatory
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 2000,
    }, {
        Cookie: `token=${tokenID}`,
    });

    expect(paritiallyUpdatedResponse.status).toBe(200);
    expect(await paritiallyUpdatedResponse.body.totalprice).toBe(2000);

    //4.Get Bookings
    let getResp = await bookerHelper.get(`/booking`);
    expect(getResp.status).toBe(200);
    console.log(getResp.body.json);

    //4.Get a booking by booking ID :
    let getResponse = await bookerHelper.get(`/booking/${bookingID}`);
    expect(getResponse.status).toBe(200);
    console.log(getResponse.body);

    //5.Delete a booking by bookingID: needs token
    let deleteResponse = await bookerHelper.delete(`/booking/${bookingID}`, {
        Cookie: `token=${tokenID}`
    });

    expect(deleteResponse.status).toBe(201);

    //6.Get booking after deleting -> No body/getting error -> commented
    // let getResp = await bookerHelper.get(`/booking/${bookingID}`);
    // expect(getResp.status).toBe(404);

});

