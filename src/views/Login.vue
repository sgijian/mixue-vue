<!-- Login.vue -->
<template>
  <div class="login-container">
    <login-component />
  </div>
</template>

<script>
import LoginComponent from '@/components/Loginview/LoginComponent.vue';
import top from '@/components/Loginview/top.vue';

export default {
  components: {
    LoginComponent,
  },
};
</script>

<style scoped>
.login-container {
  padding: 20px;
}
</style>