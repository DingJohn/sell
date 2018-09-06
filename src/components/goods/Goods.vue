<template>
  <div class="goods">
    <div class="left-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="item" :class="{ 'current':currentIndex === index }">
          <span class="text border-1px">
            <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
          {{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="right-wrapper" ref="goodWrapper">
      <ul>
        <li v-for="goods in goods" class="item-goods" ref="foodList">
          <span class="goods-type">{{ goods.name }}</span>
          <ul>
            <li v-for="food in goods.foods" class="item-food">
              <div class="food-left">
                <img :src="food.icon" class="food-icon">
              </div>
              <div class="food-right">
                <span class="food-name">{{ food.name }}</span>
                <span v-show="food.description" class="food-description">{{ food.description }}</span>
                <div class="sell-rating">
                  <span class="sell-count">月售{{ food.sellCount }}份</span>
                  <span class="rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="food-price">
                  <span class="money-sign">¥</span>
                  <span class="current-price">{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old-price">¥{{ food.oldPrice }}</span>
                </div>
              </div>
              <v-regulation class="regulation"></v-regulation>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import Regulation from '../regulation/Regulation'
  import BScroll from 'better-scroll'

  export default {
    name: "Content",
    props: {
      data: {}
    },
    data() {
      return {
        listHeight: [],
        scrollY: 0,
        currentIndex: 0
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    },
    components: {
      'v-regulation': Regulation
    },
    computed: {
      goods: function () {
        return this.data.goods
      }
    },
    methods: {
      _initScroll() {
        // 初始化滚动效果

        // 如果不加 click: true，则该滚动目录下的所有组件都不能点击
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true})
        this.goodScroll = new BScroll(this.$refs.goodWrapper, {click: true})
        this.goodScroll.on('scroll', (pos) => {
          console.log("scroll:===>", pos.y)
        })
      },
      _calculateHeight() {
        //测量 goodWrapper 的高度
        let foodList = this.$refs.goodWrapper.getElementsByClassName("item-goods")
        let height = 0
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="stylus">

  @import "../../common/stylus/mixin.styl"

  .goods
    top 174px
    width 100%
    bottom 46px
    display flex
    overflow hidden
    position absolute
    .left-wrapper
      width 80px
      flex 0 0 80px
      text-align center
      background #f3f5f7
      .item
        display table
        padding 0 12px
        &.current
          z-index 10
          margin-top -1px
          position relative
          background: #fff
          font-weight: 700
          .text
            border-none()
        .text
          width 56px
          height 54px
          font-size 12px
          font-weight 200
          text-align left
          display table-cell
          vertical-align middle
          color rgb(77, 85, 93)
          border-1px(rgba(7, 17, 27, .1))
          .icon
            float left
            width 12px
            height 12px
            margin-right 2px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .right-wrapper
      flex 1
      background-color rgb(255, 255, 255)
      .item-goods
        width 100%
        .goods-type
          width 100%
          height 26px
          font-size 12px
          line-height 26px
          padding-left 13px
          display inline-block
          color rgb(147, 153, 159)
          background-color #f3f5f7
          border-left 2px solid #d9dde1
      .item-food
        font-size 0
        display flex
        margin 18px 18px 0 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
          margin-bottom: 0
        .food-left
          width 64px
          height 64px
          vertical-align top
          display inline-block
          .food-icon
            width 64px
            height 64px
        .food-right
          flex 1
          margin-top 2px
          margin-left 10px
          vertical-align top
          display inline-block
          .food-name
            font-size 14px
            line-height 14px
            color rgb(7, 17, 27)
          .food-description
            display block
            margin-top 8px
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
          .sell-rating
            font-size 0
            margin-top 8px
            .sell-count, .rating
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
            .rating
              margin-left 12px
          .food-price
            margin-bottom 18px
            .money-sign, .current-price
              line-height 24px
              color rgb(255, 0, 0)
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
        .regulation
          right 0
          bottom 18px
          position absolute

</style>
