<template>
  <div class="regulation">
    <transition name="move">
      <div class="reduce" v-show="food.count" @click.stop="reduceCount">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <span v-show="food.count" class="count">{{ food.count }}</span>
    <i class="add icon-add_circle" @click.stop="addCount"></i>
  </div>
</template>

<script>

  import Vue from 'vue'

  export default {
    name: "Regulation",
    props: {
      food: {}
    },
    methods: {
      reduceCount(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      },
      addCount(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      }
    }
  }
</script>

<style lang="stylus">

  .regulation
    font-size 0
    .reduce
      opacity 1
      vertical-align top
      display inline-block
      transform: translate3d(0, 0, 0)
      .inner
        font-size 24px
        line-height 24px
        transform rotate(0)
        color rgb(0, 160, 220)
        transition all 0.4s linear
      &.move-enter-active, &.move-leave-active
        transition all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .add
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
