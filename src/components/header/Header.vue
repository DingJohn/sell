<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avater">
        <img :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-content" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <i class="icon-keyboard_arrow_right"></i>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1>{{ seller.name }}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div v-if="seller.supports" class="title-wrapper">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div v-if="seller.supports" class="supports-wrapper">
              <ul>
                <li class="item-supports" v-for="item in seller.supports">
                  <span class="icon" :class="classMap[item.type]"></span>
                  <span class="text">{{ item.description }}</span>
                </li>
              </ul>
            </div>
            <div v-if="seller.bulletin" class="title-wrapper">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div v-if="seller.bulletin" class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  import Star from '../star/Star'

  export default {
    name: "First",
    // 用于接收父Vue传过来的数据
    props: {
      seller: {}
    },
    data() {
      return {
        detailShow: false
      }
    },
    components: {
      'v-star': Star
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style lang="stylus">

  @import "../../common/stylus/mixin.styl"

  .header
    color #fff
    position relative
    background-color: rgba(0, 0, 0, .5)
    .content-wrapper
      padding 24px 12px 18px 24px
      position relative
      .avater
        vertical-align top
        float left
        img
          display inline-block
          width 64px
          height 64px
          border-radius 4px
      .content
        display inline-block
        margin 0 12px 0 16px
        height 64px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align middle
            height 18px
            width 30px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            font-size 16px
            margin-left 6px
            line-height 18px
            font-weight bold
            vertical-align middle
        .description
          font-size 12px
          margin-bottom 10px
          font-weight 200
        .support
          margin-bottom 2px
          .icon
            display inline-block
            float left
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            vertical-align top
            font-size 10px
            font-weight 200
            margin-left 4px
            line-height 12px
      .support-content
        position absolute
        right 12px
        bottom 18px
        padding 0 6px 0 8px
        font-weight 200
        font-size 10px
        border-radius 14px
        background-color rgba(0, 0, 0, .2)
        .count
          float left
          line-height 24px
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
    .bulletin-wrapper
      height 28px
      padding 0 12px
      background-color: rgba(7, 17, 27, .2)
      .bulletin-title
        float left
        width 22px
        height 12px
        margin 8px 0
        margin-right 4px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        display block
        font-size 10px
        overflow hidden
        line-height 28px
        font-weight 200px
        white-space nowrap
        text-overflow ellipsis
      .icon-keyboard_arrow_right
        float right
        font-size 10px
        line-height 28px

    .background
      right 0
      bottom 0
      z-index -1
      width 100%
      height 100%
      position absolute
      filter: blur(10px)
      img
        width 100%
        height 100%
    .detail
      top 0
      left 0
      width 100%
      height 100%
      z-index 100
      overflow auto
      position fixed
      opacity 1
      backdrop-filter blur(10px)
      background-color rgba(7, 17, 27, .8)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height 100%
        .detail-main
          padding-top 64px
          text-align center
          padding-bottom 96px
          h1
            font-size 16px
            font-weight 70
            line-height 16px
          .star-wrapper
            margin 16px auto 28px auto
          .title-wrapper
            width 80%
            display flex
            margin 0 auto 24px auto
            .line
              flex 1
              margin-bottom 6px
              border-bottom 1px solid rgba(255, 255, 255, .2)
            .text
              margin 0 12px
              font-size 14px
              font-weight 700
              line-height 14px
              color rgb(255, 255, 255)
          .supports-wrapper
            width 80%
            text-align left
            margin 0 auto 28px auto
            .item-supports
              font-size 0
              margin 0 12px
              .icon
                width 16px
                height 16px
                vertical-align top
                margin-bottom 12px
                display inline-block
                background-size 16px 16px
                background-repeat no-repeat
                :last-child
                  margin-bottom 0
              .decrease
                bg-image('decrease_2')
              .discount
                bg-image('discount_2')
              .guarantee
                bg-image('guarantee_2')
              .invoice
                bg-image('invoice_2')
              .special
                bg-image('special_2')
              .text
                font-size 12px
                margin-left 6px
                font-weight 200
                line-height 16px
                color rgb(255, 255, 255)
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              text-align left
              font-size 12px
              font-weight 200
              line-height 24px
              color rgb(255, 255, 255)
      .detail-close
        width 32px
        height 32px
        font-size 32px
        position relative
        margin -64px auto 32px auto
        color rgba(255, 255, 255, .5)
</style>
