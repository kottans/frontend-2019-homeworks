

export interface ProfileImage {
    small: string;
    medium: string;
    large: string;
}

export interface Links {
    self: string;
    html: string;
    photos: string;
    likes: string;
}

export interface User {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    instagram_username: string;
    twitter_username: string;
    portfolio_url: string;
    profile_image: ProfileImage;
    links: Links;
}

export interface Urls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface Image {
    id: string;
    created_at: Date;
    width: number;
    alt_description: string;
    height: number;
    color: string;
    likes: number;
    liked_by_user: boolean;
    description: string;
    user: User;
    current_user_collections: any[];
    urls: Urls;
    links: Links;
}

export interface SearchResponse{
    total: number;
    total_pages: number;
    results: Array<Image>
}

export interface FetchTokenResponse {
    access_token: string
    token_type: string
    refresh_token: string
    scope: string
    created_at: number
}