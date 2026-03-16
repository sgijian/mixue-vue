<template>
  <div>
    <van-submit-bar
      v-if="orderItems.length > 0"
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址：<span @click="showAddressList = true">{{ selectedAddress ? selectedAddress.address : '请选择地址' }}</span>
      </template>
    </van-submit-bar>

    <!-- 地址列表弹出层 -->
    <van-action-sheet v-model="showAddressList" title="选择收货地址">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelectAddress"
      />
    </van-action-sheet>

    <!-- 地址编辑弹出层 -->
    <van-popup v-model="showAddressEdit" position="bottom" round>
      <van-address-edit
        v-model="addressInfo"
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        @close="showAddressEdit = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { AddressList, AddressEdit, ActionSheet, Toast } from 'vant';

export default {
  components: {
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit,
    [ActionSheet.name]: ActionSheet,
  },
  props: {
    orderItems: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    addresses: {
      type: Array,
      required: true,
    },
    selectedAddressId: {
      type: String,
      required: true,
    },
  },
  data() {
  console.log('Initial showAddressEdit:', false);
  return {
    showAddressList: false,
    showAddressEdit: false, 
    addressInfo: {},
    chosenAddressId: '',
    areaList: {
      province_list: {
        110000: '北京市',
        120000: '天津市',
      },
      city_list: {
        110100: '市辖区',
        110101: '东城区',
        110102: '西城区',
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
      },
    },
    searchResult: [],
    list: [
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ],
    disabledList: [
      {
        id: '3',
        name: '王五',
        tel: '1320000000',
        address: '浙江省杭州市滨江区江南大道 15 号',
      },
    ],
  };
},
  computed: {
    selectedAddress() {
      return this.addresses.find(address => address.id === this.chosenAddressId);
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit-order');
    },
    onEdit(item, index) {
      this.addressInfo = this.addresses.find(address => address.id === item.id);
      this.showAddressEdit = true;
      Toast('编辑地址:' + index);
    },
    onSave(content) {
      this.$emit('save-address', content);
      this.showAddressEdit = false;
      Toast('save');
    },
    onDelete(id) {
      this.$emit('delete-address', id);
      this.showAddressEdit = false;
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onAdd() {
  console.log('onAdd method called'); 
  this.addressInfo = {};
  this.showAddressEdit = true;
  console.log('showAddressEdit set to:', this.showAddressEdit);
},
    onSelectAddress(item) {
      this.chosenAddressId = item.id;
      this.$emit('update:selectedAddressId', item.id); 
      this.showAddressList = false;
      Toast('选择地址: ' + item.address);
    },
  },
};
</script>

<style>
.van-address-edit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>