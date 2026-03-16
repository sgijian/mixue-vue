<template>
  <div class="mine">
    <div class="user-info" style="margin-top: 20px;">
      <div style="display: flex; align-items: center;">
        <van-image v-if="user" :src="user.avatar" width="50" height="50" round style="margin-right: 10px;" />
        <h2>{{ user ? user.username : '未登录' }}</h2>
      </div>
    </div>

    <div style="overflow-x: auto; margin-top: 20px;">
      <van-list style="height: 450px;width:300%;display: flex;">
        <van-image @click="change" :src="require('../../public/m1.png')" width="100%" />
        <van-image @click="change" :src="require('../../public/m2.png')" width="100%" />
        <van-image @click="change" :src="require('../../public/m3.png')" width="100%" />
      </van-list>
    </div>

    <div class="big" style="width: 100%; height: 60px; display: flex; justify-content: space-between;">
      <div class="left" style="width: 48%; height: 60px; border-radius: 15px; background-color: rgb(255, 252, 252); margin-left: 10px; position: relative;">
        <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);">{{ user ? user.snowCoins : 0 }}</span>
        <van-image style="width: 50px; height: 60px; float: right; margin-right: 10px;" @click="change" :src="require('../../public/m4.png')" />
      </div>
      <div class="right" style="width: 48%; height: 60px; border-radius: 15px; background-color: rgb(255, 252, 252); margin-right: 10px; position: relative;">
        <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);">{{ user ? user.coupons : 0 }}</span>
        <van-image style="width: 50px; height: 60px; float: right; margin-right: 10px;" @click="change" :src="require('../../public/m5.png')" fit="cover" />
      </div>
    </div>

    <span style="float: left; font-size: medium"><strong>更多服务</strong></span>
    <br>
    <div class="xx" style="width: 100%; margin-top: 20px;">
      <gide2 />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import gide2 from '@/components/MineComponents/gide2.vue';

export default {
  components: {
    gide2,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    change() {
      this.$router.push("/order");
    },
  },
};
</script>

<style scoped>
.mine {
  padding: 20px;
}

.user-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.big .left, .big .right {
  position: relative;
  padding: 0px;
}

.big .left span, .big .right span {
  color: black;
  font-weight: bold;
}
</style>