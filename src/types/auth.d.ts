export interface AuthUser {
  _id?: string;
  email: string;
  username: string;
  name?: string;
  // Add more fields if your user object has them
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (params: { email: string; password: string; username?: string }) => Promise<boolean>;
  register: (params: { email: string; password: string; username: string; name?: string }) => Promise<boolean>;
  logout: () => void;
  hydrate: () => void;
}
