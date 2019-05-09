import axios from "axios";
import {config} from "../configs/"
import {SearchResponse} from "../types/API";
import Unsplash, {toJson} from "unsplash-js";

const apiUrl = '/search/photos';

const options = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Authorization': `Client-ID ${config.clientId}`
    }
});

const optionsId = axios.create({
    baseURL: config.baseURLId2,
    headers: {
        'Authorization': `Client-ID ${config.clientId}`
    }
});

export const getImages = async (searchInput: string, currentPage: number) => {
    const axiosConfig = {
        params: {
            query: searchInput,
            page: currentPage
        }
    };
    const response = await options.get<SearchResponse>(apiUrl, axiosConfig);
    const {total, total_pages: totalPages, results: items} = response.data;
    return {total, totalPages, items};

};

const unsplash = new Unsplash({
    applicationId: `${config.clientId}`,
    secret: `${config.secretKey}`
});

export const getImage = async (imageId: string) => {
    const result = await unsplash.photos.getPhoto(imageId, 1920, 1080, [0, 0, 1920, 1080]);
    const res = result.json();
    return res;
};


