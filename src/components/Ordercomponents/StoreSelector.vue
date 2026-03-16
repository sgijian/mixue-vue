<!-- StoreSelector.vue -->
<template>
  <div class="store-selector" v-if="isVisible">
    <StoreNavigation
      :stores="stores"
      :selectedStore="selectedStore"
      @select-store="handleSelectStore"
    />
  </div>
</template>

<script>
import StoreNavigation from './StoreNavigation.vue';

export default {
  components: {
    StoreNavigation,
  },
  props: {
    stores: {
      type: Array,
      required: true,
    },
    selectedStore: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    handleSelectStore(store) {
      this.selectStore(store);
      this.hideComponent();
    },
    selectStore(store) {
      this.$emit('select-store', store);
    },
    hideComponent() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.store-selector {
  padding: 16px;
}
</style>