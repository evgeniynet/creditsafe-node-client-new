import FormData = require('formdata');
import { AuthenticationApi } from './authentication';
import { CompanyApi } from './company';
import { PeopleApi } from './people';
export interface CreditsafeOptions {
    host?: string;
    username?: string;
    password?: string;
    debug?:boolean;
}
export interface CreditsafeError {
    type: string;
    message?: string;
    error?: string;
}
export declare class Creditsafe {
    host: string;
    username: string;
    password: string;
    authentication: AuthenticationApi;
    company: CompanyApi;
    people: PeopleApi;
    constructor(username: string, password: string, options?: CreditsafeOptions);
    fire(method: string, uri: string, query?: {
        [index: string]: number | string | boolean;
    }, body?: object | object[] | FormData): Promise<{
        response: any;
        payload?: any;
    }>;
}
export declare function mkError(message: string): CreditsafeError;
