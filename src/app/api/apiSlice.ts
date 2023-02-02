import { IUser } from './../../models/user';
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import type { RootState } from '../store'

interface IRefreshResult {
    token: string,
    userId: string
};

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7248',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args:string | FetchArgs, api:BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth;
            const refresh = refreshResult.data as IRefreshResult;

            // store the new token 
            api.dispatch(setCredentials(Object.assign(user, refresh)))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut(null));
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})