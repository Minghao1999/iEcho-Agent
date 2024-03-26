import { User } from "./api";

export interface UserAccountData {
    firstname: string;
    lastname: string;
    street: string;
    apartment:string;
    city: string;
    country: string;
    postcode:string;
    phone: string;
    mobile: string;

}


export interface UserState {
  user: User | null; 
  isLoading: boolean;
}

export interface SupplierData  extends UserAccountData {
    company_name:string;
    company_country:string;
    company_number:string;
    country_code:string;
}

export interface GetVerificationData {
    certificateType: string;
    scheme: string;
    certificateNumber: string;
  }
  
export interface AuditorFormData {
    auditorName: string;
    auditorEmail: string;
  }
  