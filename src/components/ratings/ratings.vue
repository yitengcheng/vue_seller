<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating, index) in ratings" class="rating-item" :key="index" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img style="border-radius: 50%" :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(item, i) in rating.recommend" :key="i">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
import { formatDate } from '../../common/js/Date';

const ALL = 2;
const ERR_OK = 0;

export default {
  components: { star, split, ratingselect },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  created () {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body;
      if (res.errno === ERR_OK) {
        this.ratings = res.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }
    });
  },
  methods: {
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    selectRating (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.ratings
  position absolute
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  .overview
    display flex
    padding 18px 0
    .overview-left
      flex 0 0 137px
      padding 6px 0
      width 137px
      border-right 1px solid rgba(7, 17, 27, 0.1)
      text-align center
      @media only screen and (max-width: 320px)
        flex 0 0 120px
        width 120px
      .score
        margin-bottom 6px
        line-height 28px
        font-size 24px
        color rgb(255, 153, 0)
      .title
        margin-bottom 8px
        line-height 12px
        font-size 12px
        color rgb(7, 17, 27)
      .rank
        line-height 10px
        font-size 10px
        color rgb(147, 153, 159)
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left 6px
      .score-wrapper
        margin-bottom 8px
        line-height 18px
        font-size 0
        .title
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .star
          display inline-block
          margin 0 12px
          vertical-align top
        .score
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(255, 153, 0)
      .delivery-wrapper
        font-size 0
        .title
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .delivery
          margin-left 12px
          font-size 12px
          color rgb(147, 153, 159)
  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .avater
        flex 0 0 28px
        width 28px
        margin-right 12px
      .content
        position relative
        flex 1
        .name
          font-size 10px
          line-height 12px
          color rgb(7, 17, 27)
          margin-bottom 4px
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            vertical-align top
            margin-right 6px
          .delivery
            display inline-block
            vertical-align top
            font-size 10px
            line-height 12px
            color rgb(147, 153, 159)
        .text
          line-height 18px
          color rgb(7, 17, 27)
          font-size 12px
          margin-bottom 8px
        .recommend
          line-height 16px
          font-size 0
          .icon-thumb_up, .item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          .icon-thumb_up
            color rgb(0, 160, 220)
          .item
            color rgb(147, 153, 159)
            padding 0 6px
            border 1px solid rgba(7, 17, 27, 0.1)
            border-radius 1px
            border-color rgb(147, 153, 159)
            background #fff
        .time
          position absolute
          top 0
          right 0
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
</style>
