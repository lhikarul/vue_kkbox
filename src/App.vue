<template>
  <div id="app">
    <header>
        <router-link to="/">KKBOX排行榜</router-link>
    </header>
    <router-view/>
    <YTplayer :YTid="youtubeID"></YTplayer>
  </div>
</template>

<script>
  import YTplayer from 'components/YTplayer';
  import {playerListMixins} from 'util/mixins';
  export default {
    mixins: [playerListMixins],
    components: {
      YTplayer
    }
  }
</script>

<style lang="scss">
@import 'styles/grid';
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
  }

  body {
    font-family: "微軟正黑體";
    background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
    color: #fff;
  }

  header {
    position: fixed;
    top: 0;
    z-index: 999;
    padding: 0 30px;
    line-height: 50px;

    a {
      text-decoration: none;
      font-size: 20px;
      color: #fff;
      transition: color .3s linear;
      &:hover {
        color: #9d65b5;
      }
    }
  }
</style>
