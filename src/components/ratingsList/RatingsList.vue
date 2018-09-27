<template>
  <div>
    <v-ratingsSelect :ratings="ratings" :titleDesc="titleDesc" @checkText="getCheckText"
                     @selectType="getType"></v-ratingsSelect>
    <div class="cut-line"></div>
    <div class="ratings">
      <ul v-show="ratings && ratings.length">
        <li v-show="needShow(rating.rateType,rating.text)" class="rating-li" v-for="rating in ratings">
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
      <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
    </div>
  </div>
</template>

<script>

  import {formatDate} from '../../common/js/date'
  import RatingsSelect from '../ratingsSelect/RatingsSelect'

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
      }
    },
    data() {
      return {
        type: ALL,
        checkText: false,
        titleDesc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    methods: {
      needShow(type, text) {
        if (!text && this.checkText) {
          return false
        }
        if (this.type === ALL) {
          return true
        } else {
          return type === this.type
        }
      },
      getType(type) {
        this.type = type
      },
      getCheckText(checkText) {
        this.checkText = checkText
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-ratingsSelect': RatingsSelect
    }
  }
</script>

<style lang="stylus">

  @import "../../common/stylus/mixin.styl"

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
    .no-rating
      padding: 16px 0
      font-size: 12px
      color: rgb(147, 153, 159)

</style>
