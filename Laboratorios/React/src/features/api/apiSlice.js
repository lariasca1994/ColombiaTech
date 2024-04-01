import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjAyNjZhNWM1NDYyMGMxNmI1ZTdjZjQiLCJlbWFpbCI6InJvY2tkYW5uQGhvdG1haWwuY29tIiwiaWF0IjoxNzExNDkyMTQ2fQ.whG-1A5_cpVqMCb3f-spIES2gaN5w1HDq5HMyvTdT6M";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090",
    prepareHeaders: (headers, {getState}) => {
      // const localData = JSON.parse(localStorage.getItem("sessionData"));
      // const token = localData.token;
      const token = getState().auth.token;
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
      providesTags: ["Users"], //=> Función que se ejecuta al hacer un llamado en conjunto con el invalidate
      transformResponse: (response) =>
        response.sort((a, b) =>
          a.name[0].toUpperCase() < b.name[0].toUpperCase()
            ? -1
            : a.name[0].toUpperCase() > b.name[0].toUpperCase()
            ? 1
            : 0
        ), //=> Transforma y reordena
    }),
    getUserById: builder.query({
      query: (_id) => "/user/" + _id,
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/user/${user._id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users", "User"],
    }),
    removeUser: builder.mutation({
      query: (_id) => ({
        url: `/user/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateAvatar: builder.mutation({
      query: (body) => ({
        url: `/upload/${body._id}/user`,
        method: "POST",
        body: body.file,
      }),
      invalidateTags: ["Users"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation,
  useUpdateAvatarMutation,
  useLoginMutation,
} = apiSlice;