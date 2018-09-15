<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="table">
      <div class="table-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="table-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="table-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>

  import httpAxios from './base/http/httpAxios'
  import apiModule from './base/api/apiModule'
  import Header from './components/header/Header'

  export default {
    name: 'App',
    components: {
      'v-header': Header
    },
    data() {
      return {
        seller: {}
      }
    },
    created() {
      httpAxios(apiModule.getSell, {"srChannel": "h5",})
        .then((res) => {
          this.seller = res
        }, (error) => {
          console.log(error)
        })
    }
  }
</script>

<style lang="stylus">

  @import "common/stylus/icon.styl"
  @import "common/stylus/mixin.styl"

  .table
    display flex
    widows 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, .1))
    .table-item
      flex 1
      text-align center
      .active
        color rgb(240, 20, 20)
      a
        display block
        font-size 14px

</style>
