interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface JwtPayload {
  userId: string;
  login: string;
}

interface JwtRefreshPayload extends JwtPayload {
  refreshToken: string;
}

export { Tokens, JwtPayload, JwtRefreshPayload };
