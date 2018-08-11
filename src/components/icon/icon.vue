<template>
  <span v-if="icon >= 0" class="icon" :class="classMap[icon] + '_' + iconType" :style="iconStyle"></span>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    icon: {
      type: Number
    },
    iconType: {
      type: Number
    },
    iconStyle: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special',
      'invoice', `guarantee`];
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .icon
    display : inline-block
    vertical-align : top
    height : 12px
    width : 12px
    background-size : 12px 12px
    background-repeat : no-repeat
    margin-right : 4px
    &.decrease_1
      bg-image('./img/decrease_1')
    &.discount_1
      bg-image('./img/discount_1')
    &.guarantee_1
      bg-image('./img/guarantee_1')
    &.invoice_1
      bg-image('./img/invoice_1')
    &.special_1
      bg-image('./img/special_1')
    &.decrease_2
      bg-image('./img/decrease_2')
    &.discount_2
      bg-image('./img/discount_2')
    &.guarantee_2
      bg-image('./img/guarantee_2')
    &.invoice_2
      bg-image('./img/invoice_2')
    &.special_2
      bg-image('./img/special_2')
    &.decrease_3
      bg-image('./img/decrease_3')
    &.discount_3
      bg-image('./img/discount_3')
    &.guarantee_3
      bg-image('./img/guarantee_3')
    &.invoice_3
      bg-image('./img/invoice_3')
    &.special_3
      bg-image('./img/special_3')
    &.decrease_4
      bg-image('./img/decrease_4')
    &.discount_4
      bg-image('./img/discount_4')
    &.guarantee_4
      bg-image('./img/guarantee_4')
    &.invoice_4
      bg-image('./img/invoice_4')
    &.special_4
      bg-image('./img/special_4')
</style>
