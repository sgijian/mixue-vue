<template>
    <div class="gide2">
        <van-grid :column-num="4" width="100%">
            <van-grid-item @click="change" v-for="(nav,index) in navs" :key="index" :icon="nav.iconUrl" :text="nav.name"/>
        </van-grid>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navs:[
                {
                    iconUrl:"./m6.png",
                    name:"兑换码"
                },
                {
                    iconUrl:"./m7.png",
                    name:"雪王福利群"
                },
                {
                    iconUrl:"./m8.png",
                    name:"问题反馈"
                },
                {
                    iconUrl:"./m9.png",
                    name:"加盟咨询"
                },
                {
                    iconUrl:"./m10.png",
                    name:"关于我们"
                }
            ]
        }
    },methods:{
        change(){
      this.$router.push("/order")
      
    }
    }

}
</script>

<style>
</style>