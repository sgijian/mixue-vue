<template>
  <div id="app">
    <router-view v-if="isAuthenticated" />
    <van-tabbar v-model="active" v-show="isAuthenticated && this.$route.meta.isShow">
      <van-tabbar-item name="home" replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="order" replace to="/order" icon="shop-o">点餐</van-tabbar-item>
      <van-tabbar-item name="form" replace to="/form" icon="play">订单</van-tabbar-item>
      <van-tabbar-item name="mine" replace to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
    <router-view v-if="!isAuthenticated" />
  </div>
</template>

<script>
export default {
  created() {
    if (!this.isAuthenticated && this.$route.path !== '/login') {
      this.$router.push('/login').catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
    }
    this.updateActiveTab();
  },
  watch: {
    $route(to) {
      if (!this.isAuthenticated && to.path !== '/login') {
        this.$router.push('/login').catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      }
      this.updateActiveTab();
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  data() {
    return {
      active: 'home',
    };
  },
  methods: {
    updateActiveTab() {
      switch (this.$route.path) {
        case '/home':
          this.active = 'home';
          break;
        case '/order':
          this.active = 'order';
          break;
        case '/form':
          this.active = 'form';
          break;
        case '/mine':
          this.active = 'mine';
          break;
        default:
          this.active = 'home';
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>