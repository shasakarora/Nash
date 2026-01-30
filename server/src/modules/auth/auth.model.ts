export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface RefreshToken {
  id: string;
  userID: string;
  token: string;
  revoked: boolean;
  createdAt: Date;
  expiresAt: Date;
}
