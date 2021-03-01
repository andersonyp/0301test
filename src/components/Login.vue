<template>
    <div>
        <div class="login-title">登录</div>
    <!-- 登录组件 -->
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="user_name"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="pass_word"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>

        <van-notify v-model="show" type="warning">
            <span>用户名或密码错误</span>
        </van-notify>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            password: '',
            show: false
        }
    },
    methods: {
        onSubmit (values) {
            console.log('submit', values);
            /*
                post请求需要转换数据格式
            */
            // var param = {
            //     invoke_method: 'login_by_password',
            //     user_phone: values.user_name,
            //     password_user: values.pass_word,
            //     type_4_api_command: 1,
            //     id_public_agent_info: 99101
            // }
            // this.$axios({
            //     url: 'https://houduan.downline.cn/customer_public_global_mgr',
            //     method: 'post',
            //     headers:{
            //         'Content-Type':'appcalition/json;charset=utf-8'
            //     },
            //     data: JSON.stringify(param),
            // }).then((res) => {
            //     console.log(res);
            //     // this.$router.push('/Home')
            // }).catch((error) => {
            //     console.log(error);
            // })

            this.$axios.get('https://houduan.downline.cn/customer_public_global_mgr', {
                params: {
                    invoke_method: 'login_by_password',
                    user_phone: values.user_name,
                    password_user: values.pass_word,
                    type_4_api_command: 1,
                    id_public_agent_info: 99101
                }
            }).then((res) => {
                console.log(res);
                if (res.data.status != 0) {
                    this.show = true;
                    setTimeout(() => {
                        this.show = false;
                    }, 2000);
                } else {
                    window.localStorage.setItem('userId', values.user_name);
                    window.localStorage.setItem('token', values.pass_word);
                    window.localStorage.setItem('login_phone', values.user_name);
                    window.localStorage.setItem('phone_id', values.pass_word);
                    this.$router.push('/Home');
                }
            })
        }
    }
}
</script>

<style scoped>
.login-title {
    width: 100%;
    height: 2.64rem;
    text-align: center;
    line-height: 2.64rem;
    background-color: #1989fa;
    color: #fff;
    font-size: 1.067rem;
}
.van-form {
    margin-top: 2.4rem;
}
.van-notify {
    margin-top: 30%;
    width: 150px;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 12px;
    background-color: rgba(0,0,0,0.7);
}
</style>
