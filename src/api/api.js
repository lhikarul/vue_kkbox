import axios from 'axios';

// export const KKBOX_TOKEN_PATH = 'https://account.kkbox.com/oauth2/token';

// 排行榜,播放清單
const chartsRequest = axios.create({
    baseURL: 'https://api.kkbox.com/v1.1/charts'
})

export const rankRequest = (config) => chartsRequest.get('',config);
export const playerListRequest = (id,config) => chartsRequest.get(`/${id}`,config);

// youtube
const YTRequest = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
})

export const YTSearchRequest = (config) => YTRequest.get('/search', config);