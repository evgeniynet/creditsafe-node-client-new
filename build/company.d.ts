import type { Creditsafe, CreditsafeOptions, CreditsafeError } from './';
export interface CompanyAddress {
    type?: string;
    simpleValue: string;
    street: string;
    houseNumber?: string;
    city: string;
    postCode: string;
    province: string;
    country: string;
    telephone?: string;
    directMarketingOptOut?: boolean;
    directMarketingOptIn?: boolean;
}
export interface CompanyActivity {
    code: string;
    industrySector: string;
    description: string;
    classification: string;
}
export interface Company {
    id: string;
    id2: string;
    country: string;
    regNo?: string;
    vatNo?: string;
    safeNo?: string;
    name: string;
    address: CompanyAddress;
    activity?: CompanyActivity;
    officeType: string;
    type: string;
    status: string;
    legalForm?: string;
    dateOfLatestAccounts?: string;
    dateOfLatestChange?: string;
    onlineReports?: boolean;
    monitoring?: boolean;
    searchRanking?: string;
    additionalData?: any;
}
export interface CompanyList {
    correlationId: string;
    page: bigint;
    pageSize: bigint;
    totalSize: bigint;
    companies: Company[];
}
export interface CreditReport {
    companyId: string;
    language: string;
    companySummary: any;
    companyIdentification: any;
    creditScore: any;
    contactInformation: any;
    shareCapitalStructure?: any;
    directors: any;
    directorships?: any;
    otherInformation: any;
    groupStructure?: any;
    extendedGroupStructure?: any;
    financialStatements?: any;
    localFinancialStatements?: any;
    negativeInformation: any;
    negativeInformationExtra?: any;
    additionalInformation: any;
    directorsExtra?: any;
    extendedGroupStructureExtra?: any;
    paymentData?: any;
    paymentDataExtra?: any;
    alternateSummary?: any;
}
export declare class CompanyApi {
    client: Creditsafe;
    constructor(client: Creditsafe, _options?: CreditsafeOptions);
    search(search: {
        countries: string[];
        page?: number;
        pageSize?: number;
        language?: string;
        id?: string;
        safeNo?: string;
        regNo?: string;
        vatNo?: string;
        name?: string;
        tradeName?: string;
        acronym?: string;
        exact?: boolean;
        address?: string;
        street?: string;
        houseNo?: string;
        city?: string;
        postCode?: string;
        province?: string;
        callRef?: string;
        officeType?: string;
        phoneNo?: string;
        status?: string;
        type?: string;
        website?: string;
        customData?: string;
    }): Promise<{
        success: boolean;
        data?: CompanyList;
        error?: CreditsafeError;
    }>;
    creditReport(connectId: string, options?: {
        language?: string;
        debug?: boolean;
        template?: string;
        customData?: string;
        callRef?: string;
    }): Promise<{
        success: boolean;
        data?: {
            correlationId: string;
            report: CreditReport;
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
    matchSearch(search: {
        country: string;
        page?: number;
        pageSize?: number;
        matchThreshold?: number;
        regNo?: string;
        vatNo?: string;
        name?: string;
        address?: string;
        street?: string;
        houseNo?: string;
        city?: string;
        postCode?: string;
        province?: string;
        state?: string;
        callRef?: string;
        officeType?: string;
        phoneNo?: string;
        status?: string;
        type?: string;
        website?: string;
        reference1?: string;
        reference2?: string;
        reference3?: string;
    }): Promise<{
        success: boolean;
        data?: CompanyList;
        error?: CreditsafeError;
    }>;
}
