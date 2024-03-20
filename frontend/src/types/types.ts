import { User } from "./api";

export interface Address {
  street?: string;
  apartment?: string;
  city: string;
  country: string;
  postcode: string;
}


export interface InitialUserState {
  user: User | null;
  isLoading: boolean;
}
