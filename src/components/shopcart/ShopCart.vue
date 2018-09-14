<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ 'height-light': count > 0 }">
            <i class="icon-shopping_cart" :class="{ 'height-light': count > 0}"></i>
          </div>
          <div v-show="count > 0" class="count">{{ count }}</div>
        </div>
        <div class="price-wrapper" :class="{ 'height-light': count > 0 }">¥{{ totalPrice }}元</div>
        <div class="desc-wrapper">另需配送费¥{{ this.deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="descClass">{{ priceDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShopCart",
    props: {
      minPrice: 0,
      deliveryPrice: 0,
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 0,
              count: 0
            }
          ]
        }
      }
    },
    computed: {
      totalPrice() {
        let totalPrice = 0
        this.selectFoods.forEach((food) => {
          totalPrice += food.price * food.count
        })
        return totalPrice
      },
      count() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      priceDesc() {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差¥${this.minPrice - this.totalPrice}起送`
        } else {
          return `去结算`
        }
      },
      descClass() {
        if (this.totalPrice < this.minPrice) {
          return `no-enough`
        } else {
          return `enough`
        }
      }
    }
  }
</script>

<style lang="stylus">

  .shop-cart
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    position fixed
    .content
      display flex
      color rgba(255, 255, 255, .4)
      .content-left
        flex 1
        font-size 0
        background-color rgb(43, 52, 60)
        .logo-wrapper
          top -10px
          width 56px
          height 56px
          margin 0 12px
          position relative
          border-radius 50%
          vertical-align top
          display inline-block
          background-color rgb(43, 52, 60)
          .logo
            width 44px
            height 44px
            margin 6px auto
            text-align center
            border-radius 50%
            background-color rgb(128, 133, 138)
            &.height-light
              background-color rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              &.height-light
                color rgb(255, 255, 255)
        .count
          top 0
          right 0
          width 24px
          height 16px
          font-size 9px
          font-weight 700
          line-height 16px
          position absolute
          text-align center
          border-radius 16px
          color rgb(255, 255, 255)
          background-color rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
        .price-wrapper
          margin 12px
          margin-left 0
          font-size 16px
          font-weight 700
          line-height 24px
          padding-right 12px
          vertical-align top
          display inline-block
          border-right 1px solid rgba(255, 255, 255, .1)
          &.height-light
            color rgb(255, 255, 255)
        .desc-wrapper
          line-height 48px
          font-size 10px
          vertical-align top
          display inline-block
      .content-right
        flex 0 0 105px
        width 105px
        text-align center
        .pay
          font-size 12px
          font-weight 700
          line-height 48px
          &.no-enough
            background rgb(128, 133, 138)
          &.enough
            background rgb(0, 180, 60)
            color #fff

</style>
