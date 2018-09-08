<template>
  <div class="shop-cart">
    <div v-if="seller !== undefined" class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ 'height-light': account > 0 }">
            <i class="icon-shopping_cart" :class="{ 'height-light': account > 0}"></i>
          </div>
          <div v-show="account > 0" class="account">{{ account }}</div>
        </div>
        <div class="price-wrapper" :class="{ 'height-light': account > 0 }">¥{{ totalPrice }}元</div>
        <div class="desc-wrapper">另需配送费¥{{ seller.deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay">¥{{ seller.minPrice }}起送</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShopCart",
    props: {
      data: {
        type: Object,
        default: {}
      },
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 0,
              account: 0
            }
          ]
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      seller() {
        return this.data.seller
      },
      totalPrice() {
        let totalPrice = 0
        this.selectFoods.forEach((food) => {
          totalPrice += food.price * food.account
        })
        return totalPrice
      },
      account() {
        let account = 0
        this.selectFoods.forEach((food) => {
          account += food.account
        })
        return account
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
        .account
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
          background-color rgb(128, 133, 138)

</style>
