<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" style="margin-top: 20px;height: 200px;">
      <van-swipe-item>
        <img v-lazy @click="change" :src="require('../../public/9.png')" width="100%" height="200px" fit="cover" />
      </van-swipe-item>
      <van-swipe-item>
        <img v-lazy @click="change2" :src="require('../../public/10.png')" width="100%" height="200px" fit="cover" />
      </van-swipe-item>
    </van-swipe>

    <div class="x">
      <van-image @click="change" :src="require('../../public/1.jpg')" width="49%" height="20%" fit="cover" />
      <van-image @click="change" :src="require('../../public/2.jpg')" width="49%" height="20%" fit="cover" />
      <gide />
    </div>

    <div class="y" style="background-color: rgb(255, 236, 236);">
      <span style="float: left;font-size: small;margin-top: 30px;display: inline;"><strong>大家都在喝</strong></span>
      <car />
      <span style="float: left;font-size: small;margin-top: 0px;"><strong>甜蜜咨讯</strong></span>
    </div>

    <van-swipe class="swipe-2" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image @click="change2" :src="require('../../public/7.png')" width="100%" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image @click="change2" :src="require('../../public/8.png')" width="100%" />
      </van-swipe-item>
    </van-swipe>

  </div>
</template>

<style>
.y span {
  font-family: 'Courier New', Courier, monospace;
}

.home {
  background-color: white;
  margin-top: 0px;
}

.x {
  background-color: white;
  margin-top: 20px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.swipe-2 {
  margin-bottom: 50px;
  margin-top: 20px;
}
</style>
<script>
import car from '@/components/HomeCompents/car.vue';
import gide from '@/components/HomeCompents/gide.vue';
export default {
  components: {
    car,
    gide
  },
  methods: {

    change() {
      this.$router.push("/order")

    },
    change2() {
      this.$router.push("/mine")

    }
  }

}

</script>