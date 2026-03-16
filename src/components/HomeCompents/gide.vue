<template>
    <div class="gide">
        <van-grid :column-num="4">
            <van-grid-item @click="change" v-for="(nav,index) in navs" :key="index" :icon="nav.iconUrl" :text="nav.name" />
        </van-grid>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navs:[
                {
                    iconUrl:"./3.png",
                    name:"好运绒毛"
                },
                {
                    iconUrl:"./4.png",
                    name:"周周有活动"
                },
                {
                    iconUrl:"./5.png",
                    name:"0元兑周边"
                },
                {
                    iconUrl:"./6.png",
                    name:"会员免费抽"
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
 .gide{
    font-size: small;
}
</style>