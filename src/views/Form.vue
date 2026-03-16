<template>
  <div class="form">
    <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="$router.push('/home')" />
    <van-tabs v-model="activeTab">
      <van-tab title="订单">
        <div v-if="localOrderItems.length > 0">
          <van-card v-for="(item, index) in localOrderItems" :key="index" :title="item.name" :desc="item.specs"
            :price="item.price" :thumb="item.banner">
            <template #footer>
              <van-stepper v-model="item.quantity" min="0" integer @change="handleQuantityChange(item, index)" />
              <van-tag type="success">{{ item.quantity }} 份</van-tag>
            </template>
          </van-card>
          <van-submit-bar :price="totalPrice" button-text="确认订单" @submit="confirmOrder" />
        </div>
        <div v-else>
          <p>没有订单数据</p>
        </div>
      </van-tab>
      <van-tab title="进行中">
        <div v-if="ongoingOrderItems.length > 0">
          <van-card v-for="(item, index) in ongoingOrderItems" :key="index" :title="item.name" :desc="item.specs"
            :price="item.price" :thumb="item.banner">
            <template #footer>
              <van-tag type="primary">{{ item.quantity }} 份</van-tag>
            </template>
          </van-card>
        </div>
        <div v-else>
          <p>没有进行中的订单</p>
        </div>
      </van-tab>
      <van-tab title="历史订单">
        <div v-if="historyOrderItems.length > 0">
          <van-card v-for="(item, index) in historyOrderItems" :key="index" :title="item.name" :desc="item.specs"
            :price="item.price" :thumb="item.banner">
            <template #footer>
              <van-tag type="danger">{{ item.quantity }} 份</van-tag>
            </template>
          </van-card>
        </div>
        <div v-else>
          <p>没有历史订单</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      activeTab: 0,
      localOrderItems: [],
      ongoingOrderItems: [],
      historyOrderItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.localOrderItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100;
    },
  },
  created() {
    const orderData = this.$route.query.order;
    if (orderData) {
      this.localOrderItems = JSON.parse(orderData);
    }
  },
  methods: {
    handleQuantityChange(item, index) {
      if (item.quantity <= 0) {
        const removedItem = this.localOrderItems.splice(index, 1)[0];
        this.historyOrderItems.push(removedItem);
      }
    },
    confirmOrder() {
      if (this.localOrderItems.length === 0) {
        this.$toast.fail('请选择商品');
        return;
      }

      this.ongoingOrderItems = [...this.localOrderItems];
      this.localOrderItems = [];
      this.$toast.success('订单提交成功');
    }
  }
};
</script>