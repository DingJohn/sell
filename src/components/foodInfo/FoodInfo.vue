<template>
  <transition name="reveal">
    <div v-show="show" class="food-info" ref="foodInfoWrapper">
      <div class="food-content">
        <div class="food-img">
          <img :src="food.image"/>
          <div @click="clickBack" class="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="food-title">
          <h1 class="food-name">{{ food.name }}</h1>
          <div class="sales-volume-wrapper">
            <span class="sell-count">月售{{ food.sellCount }}份</span>
            <span class="good-rating-rate">好评率{{ food.rating }}%</span>
          </div>
          <div class="food-price-wrapper">
            <span class="money-sign">¥</span>
            <span class="current-price">{{ food.price }}</span>
            <span v-show="food.oldPrice" class="old-price">¥{{ food.oldPrice }}</span>
          </div>
          <div @click="addFirst($event)" v-show="!food.count || food.count===0" class="add-shop-cart">
            加入购物车
          </div>
          <div class="shop-cart-wrapper">
            <v-regulation v-show="food.count" :food="food"></v-regulation>
          </div>
        </div>
        <v-cutLine></v-cutLine>
        <div v-show="food.info" class="good-introduce-wrapper">
          <h1 class="title">商品介绍</h1>
          <p class="good-introduce">{{ food.info }}</p>
        </div>
        <v-cutLine v-show="food.info"></v-cutLine>
        <div class="good-rarings-wrapper">
          <h1 class="title">商品评价</h1>
          <v-ratingsList :ratings="food.ratings" :ratingsCount="ratingsCount" :positiveCount="positiveCount"
                         :negativeCount="negativeCount"
                         :titleDesc="{ all:'全部',positive:'推荐',negative:'吐槽' }"></v-ratingsList>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import CutLine from '../cutLine/CutLine'
  import Regulation from '../regulation/Regulation'
  import RatingsList from '../ratingsList/RatingsList'

  export default {
    name: "FoodInfo",
    props: {
      food: {}
    },
    data() {
      return {
        show: false
      }
    },
    components: {
      'v-cutLine': CutLine,
      'v-regulation': Regulation,
      'v-ratingsList': RatingsList
    },
    methods: {
      showFoodInfo() {
        this.show = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodInfoWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      clickBack() {
        this.show = false
      },
      addFirst(event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      }
    },
    computed: {
      ratingsCount() {
        return this.food.ratings.length
      },
      positiveCount() {
        let count = 0
        this.food.ratings.forEach((rating) => {
          if (rating.rateType === 0) {
            count++
          }
        })
        return count
      },
      negativeCount() {
        let count = 0
        this.food.ratings.forEach((rating) => {
          if (rating.rateType === 1) {
            count++
          }
        })
        return count
      }
    }
  }
</script>

<style lang="stylus">

  .food-info
    top 0
    left 0
    z-index 30
    width 100%
    bottom 48px
    position fixed
    background #fff
    transform translate3d(0, 0, 0)
    &.reveal-enter-active, &.reveal-leave-active
      transition all 0.2s linear
    &.reveal-enter, &.reveal-leave-active
      transform translate3d(100%, 0, 0)
    .food-img
      height 0
      width 100%
      padding-top 100%
      position relative
      img
        top 0
        left 0
        width 100%
        height 100%
        position absolute
      .back
        left 0
        top 10px
        position absolute
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .food-title
      padding 18px
      position relative
      .food-name
        font-size 14px
        font-weight 700
        line-height 14px
        color rgb(7, 17, 27)
      .sales-volume-wrapper
        font-size 0
        line-height 10px
        padding 8px 0 18px 0
        color rgb(147, 153, 159)
        .sell-count
          font-size 10px
          padding-right 12px
        .good-rating-rate
          font-size 10px
      .food-price-wrapper
        font-size 0
        .money-sign, .current-price
          line-height 24px
          color rgb(240, 20, 20)
        .money-sign
          font-size 10px
          font-weight normal
        .current-price
          font-size 14px
          font-weight 700
        .old-price
          font-size 10px
          font-weight 700
          margin-left 8px
          line-height 24px
          color rgb(147, 153, 159)
          text-decoration line-through
      .add-shop-cart
        color #fff
        right 18px
        bottom 18px
        font-size 10px
        line-height 11px
        padding 6px 12px
        position absolute
        border-radius 12px
        background-color rgb(0, 160, 220)
      .shop-cart-wrapper
        right 20px
        bottom 20px
        position absolute
    .good-introduce-wrapper
      padding 18px
      .title
        font-size 14px
        line-height 14px
        margin-bottom 6px
        color rgb(7, 17, 27)
      .good-introduce
        padding 0 8px
        font-size 12px
        font-weight 200
        line-height 24px
        color rgb(77, 85, 93)
    .good-rarings-wrapper
      .title
        padding 18px
        font-size 14px
        line-height 14px
        margin-bottom 6px
        color rgb(7, 17, 27)

</style>
