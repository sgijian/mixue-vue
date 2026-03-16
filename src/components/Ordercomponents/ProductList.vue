<template>
  <div class="product-list" v-if="filteredMenuItems.length > 0">
    <div v-for="item in filteredMenuItems" :key="item.id" class="product-card">
      <img 
        :src="getImageUrl(item)" 
        alt="Product Image" 
        class="product-image"
        @error="handleImageError($event, item)"
      />
      <div class="product-details">
        <h3 class="product-name">{{ item.name }}</h3>
        <p class="product-price">¥{{ item.price }}</p>
        <button @click="addToOrder(item)">添加到订单</button>
      </div>
    </div>
  </div>
  <div v-else>
    正在加载商品...
  </div>
</template>

<script>
export default {
  props: {
    filteredMenuItems: {
      type: Array,
      required: true,
    },
  },
  watch: {
    filteredMenuItems: {
      immediate: true,
      handler(newItems) {
        if (newItems && newItems.length > 0) {
          this.loadImages();
        }
      },
    },
  },
  methods: {
  addToOrder(item) {
    this.$emit('add-to-order', item);
  },
  getImageUrl(item) {
    console.log('Item:', item);
    console.log('Image URL for item:', item.banner);
    if (!item.banner) {
      console.warn('No banner URL for item:', item.name);
      return 'https://img1.baidu.com/it/u=2268021483,1593455944&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=380';
    }
    try {
      const url = new URL(item.banner);
      return `${url.href}?t=${new Date().getTime()}`;
    } catch (error) {
      console.error('Invalid URL for item:', item.name, error);
      return 'https://img1.baidu.com/it/u=2268021483,1593455944&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=380';
    }
  },
  loadImages() {
    this.$forceUpdate();
  },
  handleImageError(event, item) {
    console.error(`Failed to load image for item: ${item.name}`);
    event.target.src = 'https://img1.baidu.com/it/u=2268021483,1593455944&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=380';
  },
},
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column; 
  gap: 16px;
  width: 100%;
}

.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-details {
  margin-top: 8px;
}

.product-name {
  font-size: 16px;
  margin-bottom: 4px;
}

.product-price {
  color: #ff6347;
  margin-bottom: 8px;
}
</style>