<template>
  <div>
    <div class="good-ratings-label">
      <div class="all-ratings" @click="selected(2,$event)" :class="{'active': type === 2}">
        <span class="text">{{ titleDesc.all }}</span>
        <span class="num">{{ ratings.length }}</span>
      </div>
      <div class="recommend-ratings" @click="selected(0,$event)" :class="{'active': type === 0}">
        <span class="text">{{ titleDesc.positive }}</span>
        <span class="num">{{ positive.length }}</span>
      </div>
      <div class="bad-ratings" @click="selected(1,$event)" :class="{'active': type === 1}">
        <span class="text">{{ titleDesc.negative }}</span>
        <span class="num">{{ negative.length }}</span>
      </div>
    </div>
    <div class="select-look-over" @click="checkContent">
      <i class="icon-check_circle" :class="isChecked"></i>
      <span class="select-desc">只看有内容的评价</span>
    </div>
    <div class="cut-line"></div>
    <div class="ratings">
      <ul>
        <li class="rating-li" v-for="rating in ratings">
          <div class="time-user">
            <span class="rating-time">{{ rating.rateTime | formatDate}} </span>
            <div class="user-icon">
              <span class="rating-user">{{ rating.username }}</span><img :src="rating.avatar">
            </div>
          </div>
          <div class="rating-text">
            <i v-show="rating.rateType === 0" class="icon-thumb_up"></i>
            <i v-show="rating.rateType === 1" class="icon-thumb_down"></i>
            <p class="text">{{ rating.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import {formatDate} from '../../common/js/date'

  /*赞扬的评价*/
  const POSITIVE = 0
  /*吐槽的评价*/
  const NEGATIVE = 1
  /*所有的评价*/
  const ALL = 2

  export default {
    name: "RatingsList",
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      titleDesc: {
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data() {
      return {
        type: 2,
        checkText: false
      }
    },
    methods: {
      checkContent() {
        this.checkText = !this.checkText
      },
      selected(type, event) {
        if (!event._constructed) {
          return
        }
        this.type = type
      }
    },
    computed: {
      isChecked() {
        if (this.checkText) {
          return 'current'
        }
      },
      positive() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style lang="stylus">

  @import "../../common/stylus/mixin.styl"

  .good-ratings-label
    font-size 0
    margin 0 18px
    padding-bottom 18px
    border-1px(rgba(7, 17, 27, .1))
    .all-ratings, .recommend-ratings, .bad-ratings
      padding 8px 12px
      border-radius 2px
      display inline-block
      color rgb(77, 85, 93)
      .text
        font-size 12px
        padding-right 2px
      .num
        font-size 10px
      &.active
        color rgb(255, 255, 255)
    .all-ratings
      background rgba(0, 160, 220, .2)
      &.active
        background rgb(0, 160, 220)
    .recommend-ratings
      margin 0 8px
      background rgba(0, 160, 220, .2)
      &.active
        background rgb(0, 160, 220)
    .bad-ratings
      background rgba(77, 85, 93, .2)
      &.active
        background rgb(77, 85, 93)

  .select-look-over
    padding 12px 18px
    line-height 24px
    .icon-check_circle
      font-size 24px
      vertical-align top
      color rgb(147, 153, 159)
      &.current
        color rgb(0, 200, 80)
    .select-desc
      font-size 12px
      vertical-align top
      color rgb(147, 153, 159)

  .cut-line
    width 100%
    height 2px
    background rgba(7, 17, 27, .1)

  .ratings
    padding 0 18px
    .rating-li
      padding 16px 0
      border-1px(rgba(7, 17, 27, .1))
      .time-user
        display flex
        .rating-time
          flex 1
          font-size 10px
          line-height 24px
          color rgb(147, 153, 159)
        .user-icon
          height 24px
          .rating-user
            font-size 10px
            line-height 24px
            margin-right 6px
            vertical-align top
            display inline-block
            color rgb(147, 153, 159)
          img
            width 24px
            height 24px
            border-radius 50%
      .rating-text
        font-size 0
        height 16px
        .icon-thumb_up
          font-size 12px
          line-height 16px
          padding-right 4px
          color rgb(0, 160, 220)
        .icon-thumb_down
          font-size 12px
          line-height 16px
          padding-right 4px
          color rgb(147, 153, 159)
        .text
          font-size 12px
          line-height 16px
          display inline-block
          color rgb(7, 17, 27)

</style>
