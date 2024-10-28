import { Activity } from "./activity";
import { CountryCode } from "./country-code";
import { Province } from "./province";

export interface Email {
    businessName: string;
    taxCode: string;
    emailAddress: string;
    vatNumber: string;
    activity: string;
    province: Province;
    countryCode: string;
    phoneNumber: string;
    message: string;
}
