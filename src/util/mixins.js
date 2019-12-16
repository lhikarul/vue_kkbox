import {mapState,mapMutations,mapActions} from 'vuex';

export const playerListMixins = {
    methods: {
        ...mapMutations([
            'setPlayerList',
            'setCurrentSongIndex',
            'setCurrentPlayingState'
        ]),
        ...mapActions([
            'searchYT'
        ])
    },
    computed: {
        ...mapState([
            'currentSongIndex',
            'currentPlayingState',
            'playerList',
            'territory',
            'token',
            'axiosConfig',
            'youtubeID',
            'youtubeVideoTitle'
        ])
    }
}