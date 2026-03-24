import { getUserBookmarks } from "@/services/bookmarks";
import {
    useQuery,
    type QueryOptions
} from "@tanstack/react-query";
import { AxiosError } from "axios";


type BookmarksResponse = {
    bookmarks: Bookmark[];
};

type Bookmark = {
    id: number;
    user_id: string;
    post_id: number;
    created_at: string;
    updated_at: string;
    post: Post;
};

type Post = {
    id: number;
    content: string;
    author_id: string;
    type: string;
    created_at: string;
    updated_at: string;
    author: Author;
    postMedias: PostMedia[];
    _count: PostCount;
};

type PostMedia = {
    // you didn’t provide structure → keep it flexible
    [key: string]: any;
};

type PostCount = {
    likes: number;
    comments: number;
    booksmarks: number; // ⚠️ keep same spelling as backend
};

type Author = {
    id: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    avatar_url: string | null;
    email: string;
    password: string;
    student_id: string | null;
    role: string;
    status: string;
    onboarding_completed: boolean;
    id_card_url: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
};
export default function useUserBookmarks(options?: QueryOptions<BookmarksResponse, AxiosError>) {
    return useQuery<BookmarksResponse, AxiosError>({
        queryKey: ["bookmarks"],
        queryFn: getUserBookmarks,
        ...options
    })
}