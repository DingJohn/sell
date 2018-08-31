<template>
  <div class="goods">
    <div class="left-wrapper">
      <ul>
        <li v-for="item in goods">{{ item.name }}</li>
      </ul>
    </div>
    <div class="right-wrapper"></div>
  </div>
</template>

<script>
  export default {
    name: "Content",
    props: {
      goods: {}
    }
  }
</script>

<style lang="stylus">

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
      font-size 12px
      font-weight 200
      color rgb(77, 85, 93)
      line-height 54px
    .right-wrapper
      flex 1
      background-color rgb(12, 123, 223)
</style>
