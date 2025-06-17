export interface User {
  id: number;
  email: string;
  password?: string;
  firstTime: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}