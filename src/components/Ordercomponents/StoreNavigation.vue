<template>
  <div class="store-navigation">
    <!-- 地图模拟 -->
    <div
      class="map-simulation"
      @dblclick="onMapDoubleClick"
      @mousedown="onMapMouseDown"
      @mousemove="onMapMouseMove"
      @mouseup="onMapMouseUp"
      @wheel.prevent="onMapWheel"
    >
    <div
        v-for="(point, index) in path"
        :key="index"
        class="path-segment"
        :style="getPathSegmentStyle(point, path[index + 1])"
      ></div>
      <div class="zoom-controls">
        <van-button type="primary" size="mini" @click="zoomIn">+</van-button>
        <van-button type="primary" size="mini" @click="zoomOut">-</van-button>
      </div>
      <div class="user-marker" :style="{ left: `${userPosition.x * 10 * zoomLevel + 50 + mapOffset.x}%`, top: `${-userPosition.y * 10 * zoomLevel + 50 + mapOffset.y}%` }">
        <span>您在这里</span>
      </div>
      <div
        v-for="store in stores"
        :key="store.id"
        class="store-marker"
        :style="{ left: `${store.x * 10 * zoomLevel + 50 + mapOffset.x}%`, top: `${-store.y * 10 * zoomLevel + 50 + mapOffset.y}%` }"
      >
        <span>{{ store.name }}</span>
      </div>
    </div>

    <van-tabs v-model="activeTab">
      <van-tab title="附近店面">
        <!-- 显示最近的一个门店 -->
        <div class="section-header">附近</div>
        <van-grid :column-num="1" clickable v-if="nearestStore">
          <van-grid-item
            :key="nearestStore.id"
            class="store-card"
          >
            <div class="store-info">
              <h3 class="store-name">{{ nearestStore.name }}</h3>
              <p class="store-address">{{ nearestStore.address }}</p>
              <p class="store-phone">电话: {{ nearestStore.phone }}</p>
              <p class="store-opening-hours">营业时间: {{ nearestStore.openingHours }}</p>
              <div class="store-buttons">
                <van-button type="primary" size="small" @click="selectStore(nearestStore)">
                  <van-icon name="arrow-up" />
                </van-button>
                <van-button type="info" size="small" @click="toggleFavorite(nearestStore)">
                  <van-icon name="like-o" />
                </van-button>
                <van-button type="danger" size="small" @click="navigateTo(nearestStore)">
                  <van-icon name="location-o" />
                </van-button>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
        <div v-else class="no-stores">
          没有附近的门店
        </div>
        
        <!-- 显示所有的门店 -->
        <div class="section-header">全部门店</div>
        <van-grid :column-num="1" clickable v-if="allNearbyStores.length > 0">
          <van-grid-item
            v-for="store in allNearbyStores"
            :key="store.id"
            class="store-card"
          >
            <div class="store-info">
              <h3 class="store-name">{{ store.name }}</h3>
              <p class="store-address">{{ store.address }}</p>
              <p class="store-phone">电话: {{ store.phone }}</p>
              <p class="store-opening-hours">营业时间: {{ store.openingHours }}</p>
              <div class="store-buttons">
                <van-button type="primary" size="small" @click="selectStore(store)">
                  <van-icon name="arrow-up" />
                </van-button>
                <van-button type="info" size="small" @click="toggleFavorite(store)">
                  <van-icon name="like-o" />
                </van-button>
                <van-button type="danger" size="small" @click="navigateTo(store)">
                  <van-icon name="location-o" />
                </van-button>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
        <div v-else class="no-stores">
          没有附近的门店
        </div>
      </van-tab>
      <van-tab title="常去店面">
        <!-- 显示常去店面列表 -->
        <van-grid :column-num="1" clickable v-if="visitedStores.length > 0">
          <van-grid-item
            v-for="store in visitedStores"
            :key="store.id"
            class="store-card"
          >
            <div class="store-info">
              <h3 class="store-name">{{ store.name }}</h3>
              <p class="store-address">{{ store.address }}</p>
              <p class="store-phone">电话: {{ store.phone }}</p>
              <p class="store-opening-hours">营业时间: {{ store.openingHours }}</p>
              <div class="store-buttons">
                <van-button type="primary" size="small" @click="selectStore(store)">
                  <van-icon name="arrow-up" />
                </van-button>
                <van-button type="info" size="small" @click="toggleFavorite(store)">
                  <van-icon name="like-o" />
                </van-button>
                <van-button type="danger" size="small" @click="navigateTo(store)">
                  <van-icon name="location-o" />
                </van-button>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
        <div v-else class="no-stores">
          没有常去的门店
        </div>
      </van-tab>
      <van-tab title="收藏店面">
        <!-- 显示收藏店面列表 -->
        <van-grid :column-num="1" clickable v-if="favoriteStores.length > 0">
          <van-grid-item
            v-for="store in favoriteStores"
            :key="store.id"
            class="store-card"
          >
            <div class="store-info">
              <h3 class="store-name">{{ store.name }}</h3>
              <p class="store-address">{{ store.address }}</p>
              <p class="store-phone">电话: {{ store.phone }}</p>
              <p class="store-opening-hours">营业时间: {{ store.openingHours }}</p>
              <div class="store-buttons">
                <van-button type="primary" size="small" @click="selectStore(store)">
                  <van-icon name="arrow-up" />
                </van-button>
                <van-button type="info" size="small" @click="toggleFavorite(store)">
                  <van-icon name="like-o" />
                </van-button>
                <van-button type="danger" size="small" @click="navigateTo(store)">
                  <van-icon name="location-o" />
                </van-button>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
        <div v-else class="no-stores">
          没有收藏的门店
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
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
    favoriteStores: [],
    visitedStores: [],
    activeTab: 0,
    nearbyStores: [],
    userPosition: { x: 0, y: 0 },
    mapOffset: { x: 0, y: 0 },
    dragging: false,
    dragStart: { x: 0, y: 0 },
    zoomLevel: 1,
    path: []
  };
},
  computed: {
    sortedStores() {
      return this.stores.slice().sort((a, b) => {
        const distA = this.distance(a);
        const distB = this.distance(b);
        return distA - distB;
      });
    },
    nearestStore() {
      return this.sortedStores[0];
    },
    allNearbyStores() {
      return this.sortedStores; 
    },
  },
  mounted() {
    console.log('Stores:', this.stores);
    this.updateNearbyStores(); 
  },
  methods: {
    selectStore(store) {
      this.$emit('select-store', store);
    },
    toggleFavorite(store) {
      if (this.favoriteStores.includes(store)) {
        this.favoriteStores = this.favoriteStores.filter(s => s !== store);
      } else {
        this.favoriteStores.push(store);
      }
    },
    toggleVisited(store) {
      if (this.visitedStores.includes(store)) {
        this.visitedStores = this.visitedStores.filter(s => s !== store);
      } else {
        this.visitedStores.push(store);
      }
    },
    getPathSegmentStyle(start, end) {
    if (!end) return {};

    const startX = start.x * 10 * this.zoomLevel + 50 + this.mapOffset.x;
    const startY = -start.y * 10 * this.zoomLevel + 50 + this.mapOffset.y;
    const endX = end.x * 10 * this.zoomLevel + 50 + this.mapOffset.x;
    const endY = -end.y * 10 * this.zoomLevel + 50 + this.mapOffset.y;

    const isHorizontal = startY === endY;
    const isVertical = startX === endX;

    let style = {
      left: `${startX}%`,
      top: `${startY}%`
    };

    if (isHorizontal) {
      style.width = `${Math.abs(endX - startX)}%`;
      style.height = '0';
    } else if (isVertical) {
      style.width = '0';
      style.height = `${Math.abs(endY - startY)}%`;
    }

    if (endX < startX) {
      style.transform = 'translateX(-100%)';
    }

    if (endY < startY) {
      style.transform = (style.transform || '') + ' translateY(-100%)';
    }

    return style;
  },
  navigateTo(store) {
    const userPos = this.userPosition;
    const storePos = store;

    const midX = (userPos.x + storePos.x) / 2;
    const midY = (userPos.y + storePos.y) / 2;

    this.path = [
      { x: userPos.x, y: userPos.y },
      { x: midX, y: userPos.y },
      { x: midX, y: storePos.y },
      { x: storePos.x, y: storePos.y }
    ];

    console.log(`导航到 ${store.name}`);

    if (!this.visitedStores.some(s => s.id === store.id)) {
      this.visitedStores.push(store);
    }
  },
    distance(store) {
      const dx = store.x - this.userPosition.x;
      const dy = store.y - this.userPosition.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    setUserPosition(x, y) {
  this.userPosition = { x, y };
  this.path = [];
  this.updateNearbyStores();
},
    updateNearbyStores() {
      this.nearbyStores = this.sortedStores.slice(0, 5);
    },
    onMapDoubleClick(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100 - 50;
      const y = -(((event.clientY - rect.top) / rect.height) * 100 - 50);
      this.setUserPosition(x, y);
    },
    onMapMouseDown(event) {
      this.dragging = true;
      this.dragStart = { x: event.clientX, y: event.clientY };
    },
    onMapMouseMove(event) {
      if (this.dragging) {
        const dx = event.clientX - this.dragStart.x;
        const dy = event.clientY - this.dragStart.y;
        this.mapOffset.x += dx;
        this.mapOffset.y += dy;
        this.dragStart = { x: event.clientX, y: event.clientY };
      }
    },
    onMapMouseUp() {
      this.dragging = false;
    },
    zoomIn() {
      this.zoomLevel *= 1.1;
    },
    zoomOut() {
      this.zoomLevel /= 1.1;
    },
    onMapWheel(event) {
      event.preventDefault();
      if (event.deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
    }
  },
};
</script>

<style scoped>
.store-navigation {
  padding: 16px;
}

.map-simulation {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #eee;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  overflow: hidden;
}

.zoom-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

.store-marker {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.store-marker span {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;
}

.user-marker {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: blue;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.user-marker span {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;
}

.store-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.store-info {
  text-align: center;
  width: 100%;
}

.store-name {
  font-size: 18px;
  margin-bottom: 8px;
}

.store-address {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.store-phone {
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
}

.store-opening-hours {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.store-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.store-buttons .van-button {
  margin: 0 4px;
}

.no-stores {
  text-align: center;
  font-size: 16px;
  color: #555;
  margin-top: 16px;
}

.section-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: left;
}

.path-segment {
  position: absolute;
  width: 0;
  height: 0;
  border: 1px solid #007bff;
}

.store-buttons .van-button .van-icon {
  vertical-align: middle;
}
</style>