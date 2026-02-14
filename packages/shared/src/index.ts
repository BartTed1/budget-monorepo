export interface IUser {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export const API_URL = "http://localhost:3001";

export function sayHello(name: string): string {
  return `Hello ${name} from Shared Package!`;
}
