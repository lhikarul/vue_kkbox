<template>
  <div>
    <div class="rank-wrapper">
      <loading v-show="!resRank"></loading>
      <div class="container-fluid" v-show="resRank">
        <h1 class="section-title">排行榜</h1>
        <div class="row">
            <div v-for="rank in resRank.data" :key="rank.id" class="col-sm-6 col-md-4 col-lg-3">
              <router-link tag="div" :to="'playerlist/'+ rank.id"  class="rank-category rank-category-flex">
                <div class="rank-category-img flex-item-1">
                  <img :src="rank.images[0].url" alt="cover" class="rank-category-img">
                </div>
                <div class="rank-category-info flex-item-2">
                  <h2 class="rank-category-info-title">{{rank.title}}</h2>
                </div>
              </router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {playerListMixins} from 'util/mixins';
import {rankRequest} from 'api/api';

import Loading from 'components/Loading';

export default {
  name: 'Rank',
  mixins: [playerListMixins],
  components: {
    Loading
  },
  data () {
    return {
      resRank: ''
    }
  },
  methods: {
    ...mapActions([
      'getToken'
    ]),
    async getRank () {
      
      this.axiosConfig.params = {
        territory: this.territory
      }

      const resRank = await rankRequest(this.axiosConfig)
      this.resRank = resRank.data;
    }
  },
  async created () {
    await this.getToken();
    this.getRank();
  }
}
</script>

<style lang="scss" scoped>

  @import 'styles/grid';
  @import 'styles/mixins';

/* bootstrap 樣式調整 */

  .container-fluid {
    padding: 0 30px;
  }

  .row {
    justify-content: space-between;
  }

/* end of bootstrap */

.rank-wrapper {

    .section-title {
      margin-top: 65px;
      margin-bottom: 15px;
    }

    .rank-category-flex {
      display: flex;
      align-items: center;

      .flex-item-1 {
        flex: 0 0 100px;
        max-width: 100px;
      }

      .flex-item-2 {
        flex: 1;
      }
    }

    .rank-category {
      margin-bottom: 15px;
      border: 1px solid #ccc;
      cursor: pointer;

      &-info {
        padding: 0 10px;
        &-title {
          font-size: 18px;
        }
      }

      &-img {
        width: 100px;
        vertical-align: middle;
      }
    }
}
</style>