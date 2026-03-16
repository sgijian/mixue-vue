<template>
    <div class="login-component">
      <h2>登录</h2>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          autocomplete="current-password"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
        <div class="text">
          <van-radio v-model="agreementChecked" name="1">确认同意<a href="#">《用户协议》</a>和<a href="#">《隐私政策》</a></van-radio>
        </div>
      </van-form>
      <div class="third-party-login">
        <p>第三方授权登录</p>
        <div class="third-party-images">
          <img v-for="(image, index) in images" :key="index" :src="image" alt="第三方登录" @click="handleThirdPartyClick(image)" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import { Form, Field, Button, Radio } from 'vant'; // 引入 Radio 组件
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        images: [
          'zfb.png',
          'wb.png',
          'wx.png',
          'qq.png',
          'apple.png'
        ],
        agreementChecked: false,
      };
    },
    methods: {
      ...mapActions(['login']),
      onSubmit() {
        if (!this.agreementChecked) {
          this.$toast.fail('请确认同意用户协议和隐私政策');
          return;
        }
        const credentials = {
          username: this.username,
          password: this.password,
        };
        console.log('Submitting credentials:', credentials);
        this.login(credentials)
          .then(() => {
            this.$router.push('/home');
          })
          .catch(error => {
            this.$toast.fail('登录失败，请检查用户名和密码');
            console.error('登录失败:', error);
          });
      },
      handleThirdPartyClick(image) {
        console.log('Third party login clicked:', image);
      },
    },
  };
  </script>
  
  <style scoped>
  .login-component {
    padding: 20px;
  }

.third-party-login {
    margin-top: 20px;
    text-align: center;
}

.third-party-images {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

.third-party-images img {
    width: 40px; /* 调整图片大小 */
    cursor: pointer;
}

.text {
    margin-top: 10px;
}
.text a{
    color: red;
}
</style>