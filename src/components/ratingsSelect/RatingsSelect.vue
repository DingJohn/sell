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
  </div>
</template>

<script>

  /*赞扬的评价*/
  const POSITIVE = 0
  /*吐槽的评价*/
  const NEGATIVE = 1
  /*所有的评价*/
  const ALL = 2

  export default {
    name: "RatingsSelect",
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
    methods: {
      selected(type, event) {
        if (!event._constructed) {
          return
        }
        this.type = type
        this.$emit('selectType', type)
      },
      checkContent() {
        this.checkText = !this.checkText
        this.$emit('checkText', this.checkText)
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

</style>
