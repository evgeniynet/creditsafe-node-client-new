import type { Creditsafe, CreditsafeOptions, CreditsafeError } from './';
export interface CreditsafeAuth {
    success: boolean;
    token?: string;
    error?: CreditsafeError;
}
export declare class AuthenticationApi {
    client: Creditsafe;
    token?: string;
    constructor(client: Creditsafe, _options?: CreditsafeOptions);
    checkToken(): Promise<CreditsafeAuth>;
    resetToken(): Promise<CreditsafeAuth>;
    getToken(): Promise<CreditsafeAuth>;
}
