import { Contact } from "./message";

export interface UserResponse {}

export interface AuthUser {
  phone: string;
  password: string;
}

export interface ForgotUser {
  email: string;
}

export interface MessageResponse {
  success?: boolean;
  message?: string;
}

export interface UpdateSettingRequest {
  phonenumber: string;
  setting:"auto" | "manual"

}

export interface User {
  _id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse extends MessageResponse {
  data: {
    token: string;
    user: User;
  };
}

export interface ContactResponse extends MessageResponse {
  data: {
    contact: Contact[];
  };
}

export interface MessageSendRequest {
  phonenumber: string,
  sender:string,
  text: string,
  type: "text",
  name: string,
}

// export interface 
