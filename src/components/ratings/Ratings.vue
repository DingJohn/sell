<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">3.9</h1>
          <div class="title">综合评分</div>
          <div class="desc">高于周边商家69.2%</div>
        </div>
        <div class="overview-right">
          <div class="service-manner">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="4"></v-star>
            <span class="score">4分</span>
          </div>
          <div class="goods-grade">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="3"></v-star>
            <span class="score">4分</span>
          </div>
          <div class="service-time">
            <span class="title">送达时间</span>
            <span class="time">44分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Star from '../star/Star'

  export default {
    name: "Ratings",
    components: {
      'v-star': Star
    }
  }
</script>

<style lang="stylus">

  .ratings
    padding 18px 24px
    .overview
      display flex
      .overview-left
        width 127px
        flex 0 0 127px
        padding-right 24px
        text-align center
        .score
          font-size 24px
          line-height 28px
          padding-bottom 6px
          color rgb(255, 153, 0)
        .title
          font-size 12px
          font-weight 700
          line-height 18px
          padding-bottom 8px
          color rgb(7, 17, 27)
        .desc
          font-size 10px
          line-height 10px
          padding-bottom 6px
          color rgb(7, 17, 27)
      .overview-right
        flex 1
        font-size 0
        padding-left 24px
        border-left 1px solid rgba(7, 17, 27, .1)
        .title
          font-size 12px
          font-weight 700
          line-height 18px
          padding-right 12px
          color rgb(7, 17, 27)
        .score
          font-size 12px
          line-height 18px
          color rgb(255, 153, 0)
      .service-time
        .time
          font-size 12px
          line-height 18px
          color rgb(147, 153, 159)

</style>
