import type { Creditsafe, CreditsafeOptions, CreditsafeError } from './';
export interface PeopleAddress {
    type?: string;
    simpleValue: string;
    street: string;
    houseNumber?: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
    telephone?: string;
    directMarketingOptOut?: boolean;
    directMarketingOptIn?: boolean;
}
export interface PeopleMessage {
    type: string;
    code: string;
    text: string;
}
export interface Director {
    peopleId: string;
    country: string;
    firstName: string;
    lastName: string;
    title?: string;
    dateOfLatestChange?: string;
    company?: {
        companyName: string;
        safeNumber: string;
        type: string;
        charterNumber: string;
        dbt: number;
        rating: number;
        limit: number;
        derogatoryCount: number;
        derogatoryAmount: number;
    };
    address?: {
        simpleValue: string;
        street: string;
        city: string;
        postCode: string;
        province: string;
    };
    source: string;
    taxCode: string;
}
export interface DirectorList {
    correlationId: string;
    page: bigint;
    pageSize: bigint;
    totalSize: bigint;
    directors: Director[];
    messages: PeopleMessage[];
}
export interface DirectorReport {
    directorId: string;
    directorSummary: any;
    directorDetails: any;
    otherAddresses: any;
    directorships: any;
}
export declare class PeopleApi {
    client: Creditsafe;
    constructor(client: Creditsafe, _options?: CreditsafeOptions);
    search(search: {
        countries: string[];
        page?: number;
        pageSize?: number;
        peopleId?: string;
        firstName?: string;
        lastName?: string;
        localDirectorNumber?: string;
        dateOfBirth?: string;
        callRef?: string;
    }): Promise<{
        success: boolean;
        data?: DirectorList;
        error?: CreditsafeError;
    }>;
    directorReport(peopleId: string, options?: {
        language?: string;
        callRef?: string;
    }): Promise<{
        success: boolean;
        data?: {
            correlationId: string;
            report: DirectorReport;
            companyId: string;
            dateOfOrder: string;
            language: string;
            userId: string;
        };
        error?: CreditsafeError;
    }>;
    searchCriteria(countries: string[]): Promise<{
        success: boolean;
        data?: {
            correlationId: string;
            countries: string[];
            languages: string[];
            criteriaSets: any[];
        };
        error?: CreditsafeError;
    }>;
}
