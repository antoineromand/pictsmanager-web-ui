export interface UserProfileInterface {
    username: string,
    email: string,
    dateOfBirth: string,
    description: string,
    picture: string,
    coverPicture: string,
    isPublic: boolean;
}
export interface GetUserProfileResponseInterface {
    data: UserProfileInterface;
}

export interface UserPublicProfile {
    description: string | null | undefined,
    picture: string | null | undefined,
    coverPicture: string | null | undefined,
}

export interface UpdateUserProfileRequestInterface {
    payload: UserPublicProfile;
}

export interface UpdateUserProfileResponseInterface {
    data: UserProfileInterface;
}