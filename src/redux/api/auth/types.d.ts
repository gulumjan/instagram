namespace AUTH {
  interface GetUserResponse {
    profile: {
      id: string;
      username: string;
      role: string;
      email: string;
      isActive: string;
      createdAt: string;
      updatedAt: string;
      surname: string;
      photo?: string;
    }[];
  }
  type GetUserRequest = [];

  interface PostRegisterResponse {
    accessToken: string;
    accessTokenExpiration: string;
    refreshToken: string;
  }
  interface PostRegisterRequest {
    email: string;
    password: string;
    username: string;
    surname: string;
    photo?: string;
  }

  interface PostLoginResponse {
    accessToken: string;
    accessTokenExpiration: string;
    refreshToken: string;
  }
  interface PostLoginRequest {
    email: string;
    password: string;
  }
  interface logoutUserResponse {
    id: string;
    username: string;
    role: string;
    email: string;
    isActive: string;
    createdAt: string;
    updatedAt: string;
    surname: string;
    photo?: string;
  }
  type logoutUserRequest = [];

  type ForgotPasswordRequest = {
    email: string;
    frontEndUrl: string;
  };
  type ForgotPasswordResponse = {
    message: string;
  };
}