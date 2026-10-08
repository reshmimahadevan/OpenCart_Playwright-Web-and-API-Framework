import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';
import fs from 'fs';

const ajv = new Ajv();

let accessToken: string;

const OAUTH_CONFIG = {
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!
};

const ALBUM_ID = '4aawyAB9vmqN3uQ7FjRGTy'; 

test.describe.serial('Spotify album flow', () => {

    test('@smoke POST -- generate the access token', async ({ request }) => {
        const response = await request.post(OAUTH_CONFIG.tokenURL, {
            form: {
                grant_type: OAUTH_CONFIG.grantType,
                client_id: OAUTH_CONFIG.clientId,
                client_secret: OAUTH_CONFIG.clientSecret
            }
        });
        expect(response.status()).toBe(200);

        const jsonResponse = await response.json();
        accessToken = jsonResponse.access_token;

        expect(accessToken).toBeTruthy();
    });

    test('@smoke GET -- fetch album and validate schema', async ({ request }) => {
        let response = await request.get(
            `https://api.spotify.com/v1/albums/${ALBUM_ID}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        expect(response.status()).toBe(200);

        const jsonResponse = await response.json();

        // spotifyschema.json describes the ALBUM response — this is where it belongs.
        const schema = JSON.parse(fs.readFileSync('./src/schema/spotifyschema.json', 'utf-8'));
        const validate = ajv.compile(schema);
        const isSchemaValid = validate(jsonResponse);
        if (!isSchemaValid) {
            console.log('SCHEMA ERRORS: ', validate.errors);
        }

        expect(isSchemaValid).toBeTruthy();
        expect(jsonResponse.id).toBe(ALBUM_ID);
    });

});