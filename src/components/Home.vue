<template>
  <div class="home-container">
    <!-- 头部 -->
    <t-head></t-head>
    <!-- 轮播图 -->
    <div class="index-banner">
        <router-link :to="{path: '/home'}">路由跳转</router-link>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in img_data" :key="index">
            <img :src="image.img_4_page_link_wc" />
            </van-swipe-item>
        </van-swipe>
    </div>
    <!-- 标签导航 -->
    <div class="label-nav-content">
        <div class="label-nav" v-for="(menu, mindex) in menuList" :key="mindex" >
            <img :src="menu.url" alt="">
            <div>{{menu.label}}</div>
        </div>
    </div>
    <!-- 资讯列表 -->
    <div>
        <div class="news-title-text">资讯列表</div>
        <div class="news-list" v-for="(item, pindex) in page_data" :key="pindex">
            <div class="news-left">
                <img :src="item.goods_main_image" alt="">
            </div>
            <div class="news-right">
                <div class="news-title">
                    <div>{{item.goods_name}}</div>
                </div>
                <div class="news-desc">
                    {{item.goods_dec}}
                </div>
                <div class="news-label">
                    <span v-for="(label, lindex) in item.goods_info_remark_017.split(',')" :key="lindex">
                        {{label.split('-_-')[1]}}
                    </span>
                </div>
                <div class="news-time active-time">
                    <img class="icon-time" :src="timeIcon" alt="">
                    <span>{{item.time_insert.split(' ')[0].replace(/\-/g, '.')}}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Header.vue'
import hotSpot from '../assets/images/index_hotspot.jpg'
import indexActive from '../assets/images/index_active.jpg'
import timeIcon from '../assets/images/index_time_icon.png'

export default {
data () {
    return {
        img_data: [],
        page_data: [],
        timeIcon,
        hotSpot,
        indexActive,
        menuList: [
            {id: 0, label: '热点动态', url: hotSpot},
            {id: 1, label: '最新活动', url: indexActive}
        ]
    }
},
components: {
    't-head': Head
},
mounted: function () {
    this.getBanner()
},
methods: {
    // 获取轮播图数据
    getBanner: function () {
        this.$axios.get('https://houduan.downline.cn/customer_public_goods_mgr', {
            params: {
                invoke_method: 'content_frontpage_4_weichat',
                type_page_front: 1,
                is_online: 0,
                begin_idx: 0,
                length_4_list: 1000,
                front_page_remark_001: 1001
            }
        }).then((res) => {
          this.img_data = res.data.returnData.frontpage_4_weichat_arr[0]
          console.log(this.img_data)
          this.getData();
        })
    },
    // 获取页面数据
    getData: function (){
        this.$axios.get('https://houduan.downline.cn/customer_public_goods_mgr', {
            params: {
                invoke_method: 'class_page_4_weichat_more_goods',
                begin_idx: 0,
                length_4_list: 10,
                goods_info_remark_001: 1009,
                sort_name: 'time_insert',
                sort_type: 'desc'
            }
        }).then((res) => {
            var data = res.data.returnData;
            this.page_data = data.public_goods_list;
            console.log(this.page_data);
        })
    }
}
}
</script>

<style scoped>
.home-container {
    width: 100%;
    height: 100%;
}
/* 轮播图 */
.index-banner {
  margin-top: 16px;
}
.my-swipe .van-swipe-item {
  height: 165px;
  padding: 0 16px;
  box-sizing: border-box;
  border-radius: 7px;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
  border-radius: 7px;
}
/* 标签导航 */
.label-nav-content {
    display: flex;
    justify-content: space-around;
    margin-top: 16px;
    background-color: #fff;
    padding: 16px 0;

}
.label-nav img {
    width: 163px;
    height: 70px;
}
.label-nav div {
    margin-top: 5px;
}
/* 列表数据 */
.news-title-text {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding: 0 16px;
}
.news-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 16px;
    background-color: #fff;
    font-size: 14px;
}
.news-list .news-left {
    width: 75px;
    height: 75px;
}
.news-list .news-left img {
    width: 100%;
    height: 100%;
}
.news-list .news-right {
    width: 75%;
}
.news-list .news-right .news-desc {
    width: 225px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 3px 0;
    color: #878787;
    font-size: 12px;
}
.news-label {
    margin: 6px 0;
}
.news-label span {
    padding: 3px 2px;
    border: 1px solid #0f3178;
    color: #0f3178;
    font-size: 12px;
    border-radius: 3px;
    margin-right: 10px;
}
.icon-time {
    width: 10.5px;
    height: 10.5px;
}
.news-time {
    font-size: 12px;
    color: #878787;
}
</style
>>
