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
  }),
});

export const {
  useGetUserQuery,
  useLogoutUserMutation,
  usePostLoginUserMutation,
  usePostRegisterUserMutation,
  useForgotpasswordMutation,
} = api;