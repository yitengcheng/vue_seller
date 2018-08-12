<template>
  <div class="goods">
    <div class="meun-wrapper" ref="meunWrapper" >
      <ul>
        <li :class="{'current': currentIndex === index}" v-for="(item, index) in goods" :key="index" class="menu_item" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <icon :icon="item.type" :iconType="3" :iconStyle="{marginRight: 2+'px'}"/>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, key) in item.foods" :key="key" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food" @add="addFood"></cartcontrol>
              </div>
            </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods" ref="shopcart"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import icon from 'components/icon/icon';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
const ERR_OK = 0;
export default {
  components: {
    icon,
    shopcart,
    cartcontrol
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods () {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created () {
    this.$http.get('/api/goods').then((res) => {
      res = res.body;
      if (res.errno === ERR_OK) {
        this.goods = res.data;
        // nextTick在异步获取数据后执行
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
        console.log('goods', this.goods);
      }
    });
  },
  methods: {
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.meunWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      this.foodsScroll.scrollToElement(foodList[index], 300);
    },
    addFood (target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this._drop(target);
      });
    },
    _drop (target) {
      this.$refs.shopcart.drop(target);
    }
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
    .meun-wrapper
      flex : 0 0 80px /*flex三个参数,第一个等分,第二个内容不足时的缩放情况第三个是占位空间*/
      width : 80px
      background : #f3f5f7
      .menu_item
        display : table
        width : 56px
        height : 54px
        line-height : 14px
        padding : 0 12px
        &.current
          position : relative
          z-index : 10
          margin-top : -1px
          background : #fff
          font-weight : '700'
          .text
            border-none()
        .text
          display : table-cell
          width : 56px
          vertical-align : middle
          font-size : 12px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex : 1
      .title
        padding-left : 14px
        height : 26px
        line-height : 26px
        border-left : 2px solid #d9dde1
        font-size : 12px
        color : rgb(147, 153, 159)
        background : #f3f5f7
      .food-item
        display : flex
        margin : 18px
        padding-bottom : 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &.last-child
          margin-bottom : 0
          border-none()
        .icon
          flex : 0 0 57px
          margin-right : 10px
        .content
          flex : 1
          .name
            font-size : 14px
            margin : 2px 0 8px 0
            height : 14px
            line-height : 14px
            color : rgb(7, 17, 27)
          .desc, .extra
            line-height : 10px
            font-size : 10px
            color : rgb(147, 153, 159)
          .desc
            line-height : 12px
            margin-bottom : 8px
          .extra
            .count
              margin-right : 12px
          .price
            font-weight : 700
            line-height : 24px
            .now
              margin-right : 18px
              font-size : 14px
              color : rgb(240, 20, 20)
            .old
              text-decoration : line-through
              font-size : 10px
              color : rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
