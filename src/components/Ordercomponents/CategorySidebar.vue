<template>
    <van-sidebar v-model="localActiveCategoryIndex">
      <van-sidebar-item
        v-for="(category, index) in categories"
        :key="index"
        :title="category.name"
        @click="selectCategoryByIndex(index)"
      />
    </van-sidebar>
  </template>
  
  <script>
  export default {
    props: {
      categories: {
        type: Array,
        required: true,
      },
      activeCategoryIndex: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        localActiveCategoryIndex: this.activeCategoryIndex,
      };
    },
    watch: {
      activeCategoryIndex(newVal) {
        this.localActiveCategoryIndex = newVal;
      },
      localActiveCategoryIndex(newVal) {
        this.$emit('update:active-category-index', newVal);
      },
    },
    methods: {
      selectCategoryByIndex(index) {
        this.localActiveCategoryIndex = index;
      },
    },
  };
  </script>