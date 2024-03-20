export interface Supplier {
  ID: string;
  Supplier: string;
  Country: string;
  Date_request: string;
  Status: string;
  Verifier: string;
}

export interface SupplierData {
  data: Supplier[];
}

// types.ts

export interface SupplierDetail {
  id: string;
  name: string;
  country: string;
  vat: string;
  address: string;
  kycStatus: string;
  verifierName: string;
  verifierEmail: string;
  dateOfRequest: string;
  verificationType: string;
  certification: string;
  registry: string;
  certificateId: string;
}

export interface Props {
  data: SupplierDetail[];
}
