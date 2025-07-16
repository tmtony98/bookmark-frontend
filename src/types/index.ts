export interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
}

export interface Tag {
  _id: string;
  name: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface Link {
  _id: string;
  url: string;
  title: string;
  description: string;
  tags: Tag[];
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; data?: User; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; data?: User; error?: string }>;
  logout: () => void;
}
