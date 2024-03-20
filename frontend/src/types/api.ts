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

export interface AddChatRequest {
  chatId: string;
  prompt: string;
}

export interface NewChatRequest {
  prompt: string;
}

export interface ChatResponse extends MessageResponse {
  data: {
    chatId: string;
    content: string;
  };
}

export interface Message {
  id: string;
  content: string;
}

export interface MessagesState {
  prompt: string;
  content: string;
  _id: string | null;
  latest: {
    id: string;
    prompt: string;
    content: string;
  };
  all: Message[];
}
