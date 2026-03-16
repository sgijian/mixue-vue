<template>
  <div class="Order">
    <van-nav-bar title="点餐" left-text="返回" left-arrow @click-left="$router.push('/home')" />

    <!-- 门店选择 -->
    <StoreSelector v-if="showStoreSelector" :stores="stores" :selectedStore="selectedStore" @select-store="selectStore" />

    <!-- 菜单 -->
    <div v-if="selectedStore && !showStoreSelector">
      <van-cell title="已选门店" :value="selectedStore.name" @click="reselectStore" />

      <!-- 轮播图 -->
      <Carousel />

      <div class="menu-container">
        <!-- 侧边栏 -->
        <CategorySidebar :categories="categories" :activeCategoryIndex="activeCategoryIndex" @update:active-category-index="selectCategoryByIndex" />

        <!-- 商品列表组件 -->
        <div class="menu-content">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ProductList :filteredMenuItems="filteredMenuItems" @add-to-order="addToOrder" />
          </van-list>
        </div>
      </div>

      <!-- 提交订单 -->
      <OrderSummary
        :orderItems="orderItems"
        :totalPrice="totalPrice"
        :checked="checked"
        :addresses="addresses"
        :selectedAddressId="selectedAddressId"
        @submit-order="onSubmit"
        @save-address="saveAddress"
        @delete-address="deleteAddress"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import StoreSelector from '@/components/Ordercomponents/StoreSelector.vue';
import CategorySidebar from '@/components/Ordercomponents/CategorySidebar.vue';
import ProductList from '@/components/Ordercomponents/ProductList.vue';
import OrderSummary from '@/components/Ordercomponents/OrderSummary.vue';
import Carousel from '@/components/Ordercomponents/Carousel.vue';

export default {
  components: {
    StoreSelector,
    CategorySidebar,
    ProductList,
    OrderSummary,
    Carousel,
  },
  data() {
    return {
      stores: [],
      checked: false,
      activeCategoryIndex: 0,
      orderItems: [],
      loading: false,
      finished: false,
      refreshing: false,
      lastLoadedIndex: 0,
      timestamp: Date.now(),
      uniqueKeyCounter: 0,
      showStoreSelector: true,
      addresses: [],
      selectedAddressId: '', 
    };
  },
  computed: {
    ...mapState(['selectedStore', 'menuItems', 'categories']),
    filteredMenuItems() {
      if (!this.categories[this.activeCategoryIndex] || !this.categories[this.activeCategoryIndex].id) {
        return this.menuItems;
      }
      const filteredItems = this.menuItems.filter(item => item.categoryId === this.categories[this.activeCategoryIndex].id);
      console.log('Filtered Menu Items:', filteredItems);
      return filteredItems;
    },
    totalPrice() {
      return this.orderItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100;
    },
  },
  methods: {
    ...mapActions(['setSelectedStore', 'loadMenuItems']),
    selectStore(store) {
      this.setSelectedStore(store);
      this.loadMenuItems(store.id);
      this.showStoreSelector = false;
    },
    selectCategoryByIndex(index) {
      this.activeCategoryIndex = index;
    },
    addToOrder(item) {
      const existingItem = this.orderItems.find(orderItem => orderItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.orderItems.push({ ...item, quantity: 1 });
      }
    },
    onSubmit() {
      const orderData = JSON.stringify(this.orderItems);
      this.$router.push({ path: '/form', query: { order: orderData } });
    },
    loadData() {
      fetch(`/data.json?timestamp=${this.timestamp}`)
        .then(response => response.json())
        .then(data => {
          this.stores = data.stores;
          console.log('Loaded Stores:', this.stores);
          console.log('Loaded Products:', data.types.flatMap(type => type.products));
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reselectStore() {
      this.showStoreSelector = true;
      this.setSelectedStore(null);
      this.orderItems = [];
      this.activeCategoryIndex = 0;
      this.filteredMenuItems = [];
      this.totalPrice = 0;
    },
    saveAddress(content) {
      const existingAddress = this.addresses.find(address => address.id === content.id);
      if (existingAddress) {
        Object.assign(existingAddress, content);
      } else {
        content.id = this.uniqueKeyCounter++;
        this.addresses.push(content);
      }
      if (content.isDefault) {
        this.selectedAddressId = content.id;
        this.addresses.forEach(address => {
          if (address.id !== content.id) {
            address.isDefault = false;
          }
        });
      }
    },
    deleteAddress(id) {
      this.addresses = this.addresses.filter(address => address.id !== id);
      if (this.selectedAddressId === id) {
        this.selectedAddressId = '';
      }
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.loadMenuItems(this.selectedStore.id);
        }

        this.loading = false;

        if (this.menuItems.length >= 10) {
          this.finished = true;
        }
      }, 500);
    },
  },
  created() {
    this.loadData();
    console.log('Filtered Menu Items:', this.filteredMenuItems);
    if (this.selectedStore) {
      this.showStoreSelector = false;
    }
  },
};
</script>

<style scoped>
.Order {
  padding: 16px;
  height: 915px;
}

.menu-container {
  display: flex;
  margin-top: 16px;
  height: calc(100vh - 200px);
}

.menu-content {
  flex: 1;
  margin-left: 16px;
  overflow-y: auto;
}
</style>