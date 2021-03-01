<template>
    <div class="head-content">
        <div @click="scanCode">扫一扫</div>
        <div>首页</div>
        <div data-type="" @click="appShare($event)">分享</div>
    </div>
</template>
<script>
import {Native} from '../common/native'

export default {
    data () {
        return {
            NativeConfig: Native()
        }
    },
    methods: {
        // 扫码
        scanCode() {
            this.NativeConfig.scan(function (data) {
                if (data) {
                    that.resolve('customer_public_goods_mgr', {
                        invoke_method: 'find_goods_info_by_code',
                        code_public_goods_info: data,
                        type_4_api_command: 1
                    }, function (data) {
                        var info = data.public_goods_list;
                        if (info.length) {
                            window.location = '4021_food_detail.html?id=' + info[0].id_public_goods_info;
                        }
                    })
                }
            })
        },
        // 分享
        appShare(e) {
            console.log(this.NativeConfig);
            var type = e.target.getAttribute('data-type');
            if (type == "cancel") {
                // that.oNode.shareContainer.hide();
            } else {
                var platform = type == 'weichat' ? 'weixin' : 'weixin_wxcircle';
                var url = "https://www.inthinth.com/004_mobile_web_site_huowuyou/407_share_index.html?upline_id_user=";
                var user_id = 3638 || '';
                this.NativeConfig.share({
                    shareTitle: "开服装店的老板必看！推荐一个可退换货的进货/货源平台！！",
                    shareDesc: "库存多？上新慢？价格高？——一贵就赔,35天20%退货为店主排忧解难。",
                    shareLink: url + user_id,
                    sharePlatform: platform,
                    shareIconUrl: "https://houduan.downline.cn/004_mobile_web_site_huowuyou/res/images/huowuyou.png",
                }, function (data) {
                    console.log('callback:' + data);
                })
                // that.oNode.shareContainer.hide();
            }
        }
    }
}
</script>
<style scoped>
.head-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 45px;
    background-color: #0F3178;
    color: #fff;
    padding: 0 16px;
    box-sizing: border-box;
}
</style>
