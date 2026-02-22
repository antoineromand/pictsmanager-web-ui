export interface CreatePostRequestInterface {
    caption: string;
    medias: string[];
}

export interface PostData {
    id: number,
    author: string,
    authorProfilePicture: string,
    caption: string,
    mediaRowReadModels: {
        mediaId: string,
        key: string,
        userId: number;
    }[],
    likes: number,
    created_at: string;
    isLikedByUser: boolean;
};