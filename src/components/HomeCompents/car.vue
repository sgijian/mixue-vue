<template>
    <div class="car" style="width:100%; flex-wrap: wrap;display: inline-flex;">
        <div style="overflow-x: auto; margin-top: 20px;">
            <van-list style="height: 200px;width:1000px;display: flex;">
                <!-- <img class="xxx" @click="change" style="height: 180px;width: 250px;"  v-for="img in imageList" src="require('../../../assets/img/1.jpg"/> -->
                <van-image class="xxx" @click="change" :src="require('../../../public/a.png')" width="100%" />
                <van-image class="xxx" @click="change" :src="require('../../../public/b.png')" width="100%" />
                <van-image class="xxx" @click="change" :src="require('../../../public/c.png')" width="100%" />
                <van-image class="xxx" @click="change" :src="require('../../../public/d.png')" width="100%" />
                <van-image class="xxx" @click="change" :src="require('../../../public/e.png')" width="100%" />
                <van-image class="xxx" @click="change" :src="require('../../../public/f.png')" width="100%" />
            </van-list>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      imageList: [
        '/1.jpg'
        , '/2.jpg'
        , '/3.jpg'
        , '/4.jpg'
        , '/5.jpg'
        , '/6.jpg'
        , '/7.jpg'
        , '/8.jpg'
        , '/9.jpg'
        , '10.jpg'
      ],
    };
  },methods:{
        change(){
      this.$router.push("/order")
      
    }
}
}

</script>
<style>
.xxx{
    margin: 15px;
}
</style>