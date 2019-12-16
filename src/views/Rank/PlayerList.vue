<template>
  <div>
      <loading v-show="!playerList"></loading>
      <div class="container" v-if="playerList">
           <h1 class="page-title">{{playerList.title}}</h1>

          <div class="row">
              <div class="col-md-4" v-for="(song,index) in playerList.tracks.data.slice(0,3)" :key="song.id" @click="handleData($event,song.album.artist.name,song.album.name,index)">
                  <div class="album-wrapper">
                        <div class="album-cover-wrapper">
                            <img class="album-cover" :src="song.album.images[1].url" alt="album cover">
                        </div>
                        <div class="album-info-wrapper">
                            <h2 class="album-name">{{song.album.name}}</h2>
                            <p>{{song.album.artist.name}}</p>
                            <time>{{song.album.release_date}}</time>
                        </div>
                  </div>
              </div>
          </div>

        <div class="others-wrapper">
            <div class="row song-wrapper " v-for="(song,index) in playerList.tracks.data.slice(3)" :key="song.id" @click="handleData($event,song.album.artist.name,song.album.name,index)">
                <div class="col-sm-2">
                    <div class="num">{{index + 4}}</div>
                </div>
                <div class="col-sm-3">
                    <div class="album-cover-wrapper">
                        <img class="album-cover" :src="song.album.images[1].url" alt="album cover">
                    </div>
                </div>
                <div class="col-sm-7">
                    <div class="song-info-wrapper">
                        <h2 class="song-name">{{song.album.name}}</h2>
                        <p>{{song.album.artist.name}}</p>
                        <time>{{song.album.release_date}}</time>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

import {playerListRequest,YTSearchRequest} from 'api/api';
import {playerListMixins} from 'util/mixins';

import Loading from 'components/Loading';

export default {
    name: 'PlayerList',
    mixins: [playerListMixins],
    components: {
        Loading
    },
    methods: {
        ...mapActions([
            'getToken'
        ]),
        async getPlayerList () {
            
            const playerlsit_id = this.$route.params.playerlist_id;

            this.axiosConfig.params = {
                territory: this.territory
            }
            
            try {
                const res = await playerListRequest(playerlsit_id,this.axiosConfig);
            }catch (error) {
                console.log('e ',error)
            }

            const res = await playerListRequest(playerlsit_id,this.axiosConfig);
            this.setPlayerList(res.data);
        },
        handleData (e,signer,song,index) {

            if (e.currentTarget.classList.contains('song-wrapper')) {
                this.searchYT({
                    signer,
                    song,
                    index: index + 3
                });
            }else {
                this.searchYT({signer,song,index});
            }
        }
    },
    async created () {
        await this.getToken();
        this.getPlayerList();
    }
}
</script>

<style lang="scss" scoped>
    @import 'styles/grid';
    @import 'styles/mixins';

/* bs4 */
    .row {
        align-items: center;
    }
/* end of bs4 */

/* global */

    .album-cover {
        display: block;
        width: 100%;
    }

/* end of global */

    .page-title {
        margin-top: 80px;
        margin-bottom: 30px;
    }

    .album-wrapper {
        cursor: pointer;
        .album-info-wrapper {
            border: 1px solid #ccc;
            padding: 10px 20px;
            line-height: 1.5;

            .album-name {
                @extend %textEllipsis;
            }
        }
    }

    .others-wrapper {
        padding-top: 100px;

        .song-wrapper {
            margin-bottom: 30px;
            border: 1px solid #ccc;
            cursor: pointer;

            .num {
                text-align: center;
                font-size: 50px;
            }

            .song-info-wrapper {
                line-height: 1.5;
            }

        }
    }

    .player-box {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 99;
        opacity: .8;

        h3 {
            padding: 15px;
            text-align: center;
        }
    }
    .player {
        height: calc(100vh - 55px);
    }
</style>