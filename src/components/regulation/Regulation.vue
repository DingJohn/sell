<template>
  <div class="regulation">
    <i v-if="count" class="reduce icon-remove_circle_outline" @click="reduceCount"></i>
    <span v-if="count" class="count" :count="count">{{ count }}</span>
    <i class="add icon-add_circle" @click="addCount"></i>
  </div>
</template>

<script>
  export default {
    name: "Regulation",
    data() {
      return {
        count: 0
      }
    },
    methods: {
      reduceCount() {
        this.count--
      },
      addCount() {
        this.count++
      }
    }
  }
</script>

<style lang="stylus">

  .regulation
    display inline-block
    .reduce, .add
      font-size 24px
      line-height 24px
      vertical-align top
      display inline-block
      color rgb(0, 160, 220)
    .count
      padding 0 6px
      font-size 10px
      line-height 24px
      vertical-align top
      display inline-block
      color rgb(147, 153, 159)

</style>
