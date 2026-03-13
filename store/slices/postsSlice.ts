import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostMeta {
    post_id: number
    likes: number
    booksmarks: number
}

interface PostsState {
    likedPostIds: number[]
    bookmarkedPostIds: number[]

    postsById: Record<number, PostMeta>
}

const initialState: PostsState = {
    likedPostIds: [],
    bookmarkedPostIds: [],
    postsById: {}
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

        setPostCounts: (state, { payload }: PayloadAction<PostMeta>) => {
            state.postsById[payload.post_id] = payload
        },

        likePost: (state, { payload: post_id }: PayloadAction<number>) => {
            if (!state.likedPostIds.includes(post_id)) {
                state.likedPostIds.push(post_id)

                if (state.postsById[post_id]) {
                    state.postsById[post_id].likes++
                }
            }
        },

        unlikePost: (state, { payload: post_id }: PayloadAction<number>) => {
            state.likedPostIds = state.likedPostIds.filter(id => id !== post_id)

            if (state.postsById[post_id]) {
                state.postsById[post_id].likes--
            }
        },

        bookmarkPost: (state, { payload: post_id }: PayloadAction<number>) => {
            if (!state.bookmarkedPostIds.includes(post_id)) {
                state.bookmarkedPostIds.push(post_id)

                if (state.postsById[post_id]) {
                    state.postsById[post_id].booksmarks++
                }
            }
        },

        removeBookmark: (state, { payload: post_id }: PayloadAction<number>) => {
            state.bookmarkedPostIds =
                state.bookmarkedPostIds.filter(id => id !== post_id)

            if (state.postsById[post_id]) {
                state.postsById[post_id].booksmarks--
            }
        },

    }
})

export const {
    likePost,
    unlikePost,
    bookmarkPost,
    removeBookmark,
    setPostCounts
} = postsSlice.actions

export default postsSlice.reducer