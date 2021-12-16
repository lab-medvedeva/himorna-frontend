<template>
  <div class="loader" v-if="getState">
        <div class="loader__window"> 
            <img src="@/assets/images/loader.svg">
            <!-- <img src="https://media.giphy.com/media/8L0xFP1XEEgwfzByQk/giphy.gif"> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    computed: {
        getState() {
            return this.$store.getters.loader
        }
    }
}
</script>

<style lang="stylus">
.loader
    display flex
    justify-content center
    align-items center
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    z-index 20
    pointer-events none
    -webkit-touch-callout none
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none

    &__window
        border-radius 20px
        overflow hidden
        filter: drop-shadow(0px 0px 20px #ebebfb)
        img
            width 200px
</style>