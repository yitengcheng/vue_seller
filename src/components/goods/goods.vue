<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu_item">
        <span class="text border-1px">
          <icon :icon="item.type" :iconType="3" :iconStyle="{marginRight: 2+'px'}"/>
          {{item.name}}
        </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, key) in item.foods" :key="key">
              <div class="icon">
                <img :src="food.icon">
              </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span>¥{{food.price}}</span>
                <span v-show="food.oldPrice">¥{{food.oldPrice}}</span>
              </div>
            </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import icon from 'components/icon/icon';
const ERR_OK = 0;
export default {
  components: {icon},
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    };
  },
  created () {
    this.$http.get('/api/goods').then((res) => {
      res = res.body;
      if (res.errno === ERR_OK) {
        this.goods = res.data;
        console.log('goods', this.goods);
      }
    });
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .goods
    display : flex
    position : absolute
    width : 100%
    top : 174px
    bottom : 46px
    overflow : hidden
    .menu-wrapper
      flex : 0 0 80px /*flex三个参数,第一个等分,第二个内容不足时的缩放情况第三个是占位空间*/
      width : 80px
      background : #f3f5f7
      .menu_item
        display : table
        width : 56px
        height : 54px
        line-height : 14px
        padding : 0 12px
        .text
          display : table-cell
          width : 56px
          vertical-align : middle
          font-size : 12px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex : 1
</style>
