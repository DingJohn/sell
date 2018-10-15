<template>
  <div class="ratings-wrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="desc">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="service-manner">
            <span class="title">服务态度</span>
            <v-star class="star" :size="36" :score="seller.serviceScore"></v-star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="goods-grade">
            <span class="title">商品评分</span>
            <v-star class="star" :size="36" :score="seller.foodScore"></v-star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="service-time">
            <span class="title">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <v-cutLine></v-cutLine>
      <div class="ratings-bottom">
        <v-ratingsSelect :ratings="ratings" @selectType="getRatingType" @checkText="getIsShowContent"></v-ratingsSelect>
        <div class="ratings-list">
          <ul>
            <li v-show="isShow(rating.rateType,rating.text)" class="rating-wrapper" v-for="rating in ratings">
              <div class="avatar">
                <img :src="rating.avatar">
              </div>
              <div class="rating-info">
                <div class="name-date">
                  <span class="ratinger-name">
                    {{ rating.username }}
                  </span>
                  <span class="rating-date">
                    {{ rating.rateTime | formatDate }}
                  </span>
                </div>
                <div class="rating-score">
                  <div class="ratings-star">
                    <v-star :size="24" :score="rating.score"></v-star>
                  </div>
                  <span v-show="rating.deliveryTime > 0" class="deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                </div>
                <div class="rating-text">
                  {{ rating.text }}
                </div>
                <div class="label">
                  <i v-show="rating.rateType === 0" class="icon-thumb_up"></i>
                  <i v-show="rating.rateType === 1" class="icon-thumb_down"></i>
                  <ul>
                    <li class="recommend" v-for="recommend in rating.recommend">
                      {{ recommend }}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Star from '../star/Star'
  import BScroll from 'better-scroll'
  import CutLine from '../cutLine/CutLine'
  import {formatDate} from '../../common/js/date'
  import apiModule from '../../base/api/apiModule'
  import httpAxios from '../../base/http/httpAxios'
  import RatingsSelect from '../ratingsSelect/RatingsSelect'

  /*所有的评价*/
  const ALL = 2

  export default {
    name: "Ratings",
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
        ratings: [],
        ratingType: ALL,
        isShowContent: false
      }
    },
    created() {
      httpAxios(apiModule.getRatings, {"srChannel": "h5",})
        .then((res) => {
          this.ratings = res
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratingsWrapper, {
              click: true
            })
          })
        }, (error) => {
          console.log(error)
        })
    },
    methods: {
      getRatingType(type) {
        this.ratingType = type
      },
      getIsShowContent(isSelect) {
        this.isShowContent = isSelect
      },
      isShow(type, text) {
        if (!text && this.isShowContent) {
          return false
        }
        if (this.ratingType === ALL) {
          return true
        } else {
          return type === this.ratingType
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-star': Star,
      'v-cutLine': CutLine,
      'v-ratingsSelect': RatingsSelect
    }
  }
</script>

<style lang="stylus">

  .ratings-wrapper
    left 0
    bottom 0
    top 174px
    padding 0 0
    overflow hidden
    position absolute
    .overview
      display flex
      padding 18px 18px
      .overview-left
        width 112px
        flex 0 0 112px
        padding-right 10px
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
          margin-bottom 6px
          color rgb(7, 17, 27)
      .overview-right
        flex 1
        font-size 0
        padding-left 10px
        border-left 1px solid rgba(7, 17, 27, .1)
        .service-manner, .goods-grade, .service-time
          padding-top 8px
        .title
          font-size 12px
          font-weight 700
          line-height 18px
          vertical-align top
          padding-right 12px
          color rgb(7, 17, 27)
          display inline-block
        .star
          vertical-align top
          padding-right 12px
          display inline-block
        .score
          font-size 12px
          line-height 18px
          color rgb(255, 153, 0)
      .service-time
        .time
          font-size 12px
          line-height 18px
          color rgb(147, 153, 159)
    .ratings-bottom
      padding 18px 0
      margin-bottom 56px
      .ratings-list
        border-top 1px solid rgba(147, 153, 159, .4)
        .rating-wrapper
          margin 18px
          display flex
          padding-bottom 18px
          border-bottom 1px solid rgba(147, 153, 159, .1)
          .avatar
            width 28px
            height 28px
            display inline-block
            img
              width 28px
              height 28px
              border-radius 50%
          .rating-info
            flex 1
            margin-left 12px
            display inline-block
            .name-date
              display flex
              .ratinger-name
                flex 1
                font-size 10px
                line-height 12px
                vertical-align top
                color rgb(7, 17, 27)
                display inline-block
              .rating-date
                flex 1
                font-size 10px
                font-weight 200
                line-height 12px
                text-align right
                vertical-align top
                display inline-block
                color rgb(147, 153, 159)
            .rating-score
              margin 4px 0 6px 0
              .ratings-star
                display inline-block
                margin-right 6px
              .deliveryTime
                font-weight 200
                line-height 12px
                color rgb(147, 153, 159)
                font-size 10px
            .rating-text
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
            .label
              display flex
              margin-top 8px
              .icon-thumb_up
                font-size 12px
                line-height 16px
                color rgb(0, 160, 220)
              .icon-thumb_down
                font-size 12px
                line-height 16px
                color rgb(183, 187, 191)
              .recommend
                flex 1
                font-size 10px
                margin-left 8px
                border-radius 2px
                padding 2px 2px 0 2px
                display inline-block
                vertical-align middle
                color rgb(147, 153, 159)
                border 1px solid rgba(7, 17, 27, .1)

</style>
