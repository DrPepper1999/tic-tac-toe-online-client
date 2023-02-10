import { apiSlice } from "../../app/api/apiSlice";

export const teamApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        teams: builder.mutation({
            query: (roomId) => ({
                url: `Rooms/GetTeams/${roomId}`,
                method: 'GET'
            })
        }),
    })
});
export const {
    useTeamsMutation
} = teamApiSlice;