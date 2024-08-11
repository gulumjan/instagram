import { api as index } from "..";

const ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;
const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<AUTH.GetUserResponse, AUTH.GetUserRequest>({
      query: () => ({
        url: `/auth/user`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    postLoginUser: builder.mutation<
      AUTH.PostLoginResponse,
      AUTH.PostLoginRequest
    >({
      query: (data) => ({
        url: `/auth/sign-in`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    logoutUser: builder.mutation<
      AUTH.logoutUserResponse,
      AUTH.logoutUserRequest
    >({
      query: (data) => ({
        url: `/auth/logout`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    postRegisterUser: builder.mutation<
      AUTH.PostRegisterResponse,
      AUTH.PostRegisterRequest
    >({
      query: (data) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    forgotpassword: builder.mutation<
      AUTH.ForgotPasswordResponse,
      AUTH.ForgotPasswordRequest
    >({
      query: (data) => ({
        url: `/auth/forgot`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    resetPassword: builder.mutation<
      AUTH.ResetPasswordResponse,
      AUTH.ResetPasswordRequest
    >({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    refreshAccesToken: builder.mutation<
      AUTH.RefreshTokenResponse,
      AUTH.RefreshTokenRequest
    >({
      query: ({ refreshToken }) => ({
        url: `/auth/refresh`,
        method: "PATCH",
        body: { refreshToken },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLogoutUserMutation,
  usePostLoginUserMutation,
  usePostRegisterUserMutation,
  useForgotpasswordMutation,
  useResetPasswordMutation,
  useRefreshAccesTokenMutation,
} = api;
