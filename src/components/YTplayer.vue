<template>
  <div ref="player">
    <div class="YT-player">
        <div class="current-playing">
            <div class="name">{{youtubeVideoTitle}}</div>
        </div>
        <div class="controllers">
            <div><i class="fas fa-backward" @click="handlePrevSong"></i></div>
            <div><i :class="playingCls" @click="handlePlayingState"></i></div>
            <div><i class="fas fa-forward" @click="handleNextSong"></i></div>
        </div>
        <div :class="videoCls">
            <div id="player"></div>
        </div>
    </div>
  </div>
</template>

<script>
import YouTubeIframeLoader from 'youtube-iframe';
import {playerListMixins} from 'util/mixins';

export default {
    name: 'YTplayer',
    mixins: [playerListMixins],
    props: {
        YTid: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            player: ''
        }
    },
    methods: {
        initPlayer () {
            YouTubeIframeLoader.load((YT) => {
                this.player = new YT.Player('player', {
                    height: '100%',
                    width: '100%',
                    videoId: this.YTid,
                    events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                    }
                });
            });
        },
        onPlayerReady (event) {
            event.target.playVideo();
            this.setCurrentPlayingState(1);
        },
        async onPlayerStateChange (event) {

            if (event.data === 0) {
                // this.nextSong();
            }
        },
        handlePrevSong () {
            this.player ?  this.prevSong() : '';
        },
        handlePlayingState (e) {

            if (!this.player) return;

            if (this.currentPlayingState === 0 && this.youtubeID) {
                this.setCurrentPlayingState(1);
                this.player.playVideo();
            }else {
                this.setCurrentPlayingState(0);
                this.player.pauseVideo();
            }
        },
        handleNextSong () {
            
            this.player ?  this.nextSong() : '';
        },
        async prevSong () {

                const index = this.currentSongIndex === 0 ?  this.playerList.tracks.data.length - 1 : this.currentSongIndex--
                const signer = this.playerList.tracks.data[index].album.artist.name;
                const song = this.playerList.tracks.data[index].name;
                await this.searchYT({signer,song,index});
                this.player.loadVideoById(this.youtubeID);
        },
        async nextSong () {
                const index = this.currentSongIndex === this.playerList.tracks.data.length - 1 ? 0: this.currentSongIndex++ 
                const signer = this.playerList.tracks.data[index].album.artist.name;
                const song = this.playerList.tracks.data[index].name;

                await this.searchYT({signer,song,index});
                this.player.loadVideoById(this.youtubeID);
        }
    },
    computed: {
        currentPlaying () {
            return this.youtubeVideoTitle;
        },
        playingCls () {
            if (this.currentPlayingState === 0) {
                return 'fas fa-play'
            }else {
                return 'fas fa-pause'
            }
        },
        videoCls () {
            return this.youtubeID ? 'YT-video' : '';
        }
    },
    watch: {
        YTid () {
            if (!this.player) {
                this.initPlayer();
                return;
            }
            this.player.loadVideoById(this.youtubeID);
        }
    }
}
</script>

<style lang="scss" scoped>
    .YT-player {
        position: fixed;
        bottom: 0;
        z-index: 99;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #000;
        color: #fff;
        height: 60px;
        line-height: 60px;
        opacity: .8;

        .current-playing {
            padding-left: 140px;
        }

        .controllers {
            display: flex;

            > div {
                padding: 0 20px;
            }
        }

        .YT-video {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 102px;
            height: 72px;
            border: 1px solid #fff;
            z-index: 100;
            &:hover {
                width: 480px;
                height: 320px;
            }
        }
    }
</style>