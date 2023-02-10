import { apiSlice } from "../../app/api/apiSlice";

export const playerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        players: builder.mutation({
            query: (playerIds) => ({
                url: `player/get`,
                method: 'GET',
                body: {playerIds}
            })
        }),
    })
});
export const {
    usePlayersMutation
} = playerApiSlice;