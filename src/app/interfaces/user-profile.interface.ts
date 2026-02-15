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
    description: string | null,
    picture: string | null,
    coverPicture: string | null,
}

export interface UpdateUserProfileRequestInterface {
    payload: UserPublicProfile;
}

export interface UpdateUserProfileResponseInterface {
    data: UserPublicProfile;
}