export interface Errors {
  code?: number;
  message?: string;
}

// types
export type AuthLand = 'login' | 'register' | 'forgot' | 'reset' | 'verify';
