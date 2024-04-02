import {reateApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiColombiaSlice = createApi({
    baseQuery: fetchBaseQuery){
        baseUrl: 'https://api-colombia.com/api/v1'
    }),
    endpoints: (builder) => ({
        getDepartaments: builder.query({
            query: () => '/Departament'
        }),
        getCitiesDepartment: builder.query({
            query: (deparmentId) => '/Department/$(departmentId)/cities'
        })
    })
})

export const {useGetDepartment}