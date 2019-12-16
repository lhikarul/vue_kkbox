import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import qs from 'querystring';
import {requiredTokenData,config} from 'api/config';

import * as types from './mutationTypes';

import {YTSearchRequest} from 'api/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerList: '',
    currentSongIndex: '',
    currentPlayingState: 0,
    youtubeID: '',
    youtubeVideoTitle: '',
    territory: 'TW',
    kkboxToken: '',
    axiosConfig: {}
  },
  mutations: {
    [types.SET_AXIOS_CONFIG] (state,value) {
      state.axiosConfig = {
        headers: {
          Authorization: `${value.token_type} ${value.access_token}`
        }
      }
    },
    [types.SET_KKBOX_TOKEN] (state,value) {
      state.kkboxToken = value;
    },
    [types.SET_CURRENT_SONG_INDEX] (state,value) {
      state.currentSongIndex = value;
    },
    [types.SET_CURRENT_PLAYING_STATE] (state,value) {
      state.currentPlayingState = value;
    },
    [types.SET_PLAYER_LIST] (state,value) {
      state.playerList = value;
    },
    [types.SET_YOUTUBE_ID] (state,value) {
      state.youtubeID = value;
    },
    [types.SET_YOUTUBE_VIDEO_TITLE] (state,value) {
      state.youtubeVideoTitle = value;
    },
  },
  actions: {
    async getToken ({commit,state},value) {
        const res = await axios.post(process.env.VUE_APP_KKBOX_PATH,qs.stringify(requiredTokenData),config);
        commit(types.SET_AXIOS_CONFIG,res.data)
    },
    async searchYT ({commit,state}, obj) {

      const config = {
          params: {
              key: process.env.VUE_APP_YOUTUBE2,
              part: "snippet",
              type: "video",
              q: `${obj.signer} ${obj.song}`
          }
      }

      const res = await YTSearchRequest(config);

      commit(types.SET_CURRENT_SONG_INDEX,obj.index);
      commit(types.SET_YOUTUBE_ID, res.data.items[0].id.videoId)
      commit(types.SET_YOUTUBE_VIDEO_TITLE, res.data.items[0].snippet.title)
    }
  }
})
