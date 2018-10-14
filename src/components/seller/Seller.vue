<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller-content">
      <div class="seller-synopsis">
        <div class="seller-header-top">
          <span class="seller-name">{{ seller.name }}</span>
          <div class="seller-sales">
            <v-star class="seller-star" :size="36" :score="seller.score"></v-star>
            <span class="rating-count">({{ seller.ratingCount }})</span>
            <span class="sell-count">月售{{ seller.sellCount }}单</span>
          </div>
          <div class="collect-seller">
            <i @click="collectSeller" class="icon-favorite" :class="{'active':isCollect}"></i>
            <span class="seller-collect">{{ this.collect }}</span>
          </div>
        </div>
        <div class="seller-header-bottom">
          <div class="seller-minPrice">
            <span class="desc-title">起送价</span>
            <div class="desc-value">
              <span class="value">{{ seller.minPrice }}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="seller-deliveryPrice">
            <span class="desc-title">商家配送</span>
            <div class="desc-value">
              <span class="value">{{ seller.deliveryPrice }}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="seller-deliveryTime">
            <span class="desc-title">平均配送时间</span>
            <div class="desc-value">
              <span class="value">{{ seller.deliveryTime }}</span>
              <span class="unit">分钟</span>
            </div>
          </div>
        </div>
      </div>
      <v-cutLine></v-cutLine>
      <div class="seller-notice">
        <h1 class="notice">公告与活动</h1>
        <p class="notice-content">{{ seller.bulletin }}</p>
        <ul>
          <li class="support-li" v-for="support in seller.supports">
            <span class="supports-icon" :class="classMap[support.type]"></span>
            <span class="supports-text">{{ support.description   }}</span>
          </li>
        </ul>
      </div>
      <v-cutLine></v-cutLine>
      <div class="seller-scene">
        <h1 class="scene-title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-li" v-for="pic in seller.pics">
              <img class="pic" :src="pic"/>
            </li>
          </ul>
        </div>
      </div>
      <v-cutLine></v-cutLine>
      <div class="seller-info">
        <h1 class="info-title">商家信息</h1>
        <ul>
          <li class="info-li" v-for="info in seller.infos">
            <span class="info-text">{{ info }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import Star from '../star/Star'
  import BScroll from 'better-scroll'
  import CutLine from '../cutLine/CutLine'

  export default {
    name: "Second",
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isCollect: false,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    mounted() {
      this.$nextTick(() => {
          if (this.sellerScroll) {
            this.sellerScroll.refresh()
          } else {
            this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {
              click: true
            })
          }
        }
      )
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (this.picScroll) {
            this.picScroll.refresh()
          } else {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              click: true,
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          }
        })
      }
    },
    methods: {
      collectSeller(event) {
        if (!event._constructed) {
          return
        }
        return this.isCollect = !this.isCollect
      }
    },
    computed: {
      collect() {
        return this.isCollect ? '已收藏' : '未收藏'
      }
    },
    components: {
      'v-cutLine': CutLine,
      'v-star': Star
    }
  }
</script>

<style lang="stylus">

  @import "../../common/stylus/mixin.styl"

  .seller-wrapper
    left 0
    bottom 0
    top 173px
    width 100%
    overflow hidden
    position absolute
    .seller-synopsis
      padding 18px
      .seller-header-top
        position relative
        border-bottom 1px solid rgba(7, 17, 27, .1)
        .seller-name
          font-size 14px
          line-height 14px
          color rgb(7, 17, 27)
        .seller-sales
          font-size 0
          padding 8px 0 18px 0
          .seller-star
            vertical-align top
            display inline-block
          .rating-count, .sell-count
            font-size 10px
            vertical-align top
            display inline-block
            line-height 18px
            color rgb(77, 85, 93)
          .rating-count
            margin 0 12px 0 8px
        .collect-seller
          right 0
          bottom 18px
          text-align center
          position absolute
          .icon-favorite
            font-size 24px
            line-height 24px
            color rgb(212, 214, 217)
            &.active
              color rgb(240, 20, 20)
          .seller-collect
            display block
            margin-top 4px
            font-size 10px
            line-height 10px
            color rgb(77, 85, 93)
      .seller-header-bottom
        display flex
        padding-top 18px
        .seller-deliveryPrice
          border-left 1px solid rgba(7, 17, 27, .1)
          border-right 1px solid rgba(7, 17, 27, .1)
        .seller-minPrice,
        .seller-deliveryTime,
        .seller-deliveryPrice
          flex 1
          text-align center
          .desc-title
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
          .desc-value
            font-size 0
            padding-top 4px
            .value, .unit
              font-weight 200
              line-height 24px
              color rgb(7, 17, 27)
            .value
              font-size 24px
            .unit
              font-size 10px

    .seller-notice
      padding 18px 18px 0 18px
      .notice
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
      .notice-content
        font-size 12px
        font-weight 200
        line-height 24px
        color rgb(240, 20, 20)
        padding 8px 12px 16px 12px
      .support-li
        padding 16px 12px
        border-top 1px solid rgba(7, 17, 27, .1)
        .supports-icon
          width 16px
          height 16px
          margin-right 6px
          vertical-align top
          display inline-block
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .supports-text
          font-size 12px
          line-height 16px
          font-weight 200px
          vertical-align top
          display inline-block
          color rgb(7, 17, 27)

    .seller-scene
      padding 18px
      .scene-title
        font-size 14px
        line-height 14px
        padding-bottom 12px
        color rgb(7, 17, 27)
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-li
            width 120px
            height 90px
            margin-right 6px
            display inline-block
            .pic
              width 100%
              height 100%
              &:last-child
                margin-right 0
    .seller-info
      padding 18px
      .info-title
        font-size 14px
        line-height 14px
        padding-bottom 12px
        color rgb(7, 17, 27)
      .info-li
        padding 16px 12px
        border-top 1px solid rgba(7, 17, 27, .1)
        &:last-child
          padding-bottom 0
        .info-text
          font-size 12px
          font-weight 200
          line-height 16px
          color rgb(7, 17, 27)
          display inline-block

</style>
