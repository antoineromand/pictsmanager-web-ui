export interface Media {
    mediaId: string;
    key: string;
}

export interface MediaListRequestInterface {
    totalElements: number;
    medias: Media[];
}