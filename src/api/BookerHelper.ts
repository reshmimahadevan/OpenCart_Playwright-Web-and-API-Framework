import { APIRequestContext } from "@playwright/test";

export class BookerHelper {

    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    // POST
    //? makes this optional
    //contentType: string = 'application/json' -> default parameter
    async post(endPoint: string, data: object, headers?: Record<string, string>, contentType: string = 'application/json') {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data,
            headers: {
                'Content-Type': contentType,
            }
        });
        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json()
        }
    }


    //GET
    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`);
        console.log(await response.json(), response.status());
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //PUT
    async put(endPoint: string, data: object, headers?: Record<string, string>, contentType: string = 'application/json', accept: string = 'application/json') {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            headers: {
                'Content-Type': contentType,
                'Accept': accept
            },
            data
        });
        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json()
        }
    }

    // PATCH
    async patch(endPoint: string, data: object, headers?: Record<string, string>, contentType: string = 'application/json', accept: string = 'application/json') {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            headers: {
                'Content-Type': contentType,
                'Accept': accept
            },
            data
        });
        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //DELETE
    async delete(endPoint: string, headers?: Record<string, string>,contentType: string = 'application/json') {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers:{
                'Content-Type' :contentType
            }
        });
        console.log(response.status());

        return {
            status: response.status(),
        }
    }
}