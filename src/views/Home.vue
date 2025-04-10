<template>
  <!-- <div class="type"></div> -->

  <div class="carousel-content">
    <div class="title-content">
      <h2>玩点不一样</h2>
      <h4>无论旅途在哪，Klook客路随时随地带你开启精彩的玩乐世界！</h4>
    </div>
    <div class="search-box">
      <v-text-field
        label="Searching"
        density="comfortable"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
      ></v-text-field>
    </div>
    <!-- banner -->
    <v-carousel
      height="450"
      show-arrows="hover"
      cycle
      hide-delimiter-background
    >
      <v-carousel-item v-for="color in colors">
        <v-sheet :color="color" class="color-content"> </v-sheet>
        <!-- <div class="d-flex fill-height justify-center align-center"></div> -->
      </v-carousel-item>
    </v-carousel>
  </div>

  <!-- 目的地推荐 -->
  <v-container>
    <div class="destination-section">
      <h2 class="text-center">Traveler's Picks</h2>
      <v-row>
        <v-col
          v-for="(destination, index) in destinations.slice(0, 6)"
          :key="index"
          cols="12"
          sm="4"
          class="column-interval"
        >
          <v-card class="card">
            <v-card :color="colors[index]" width="100%" height="200px"></v-card>
            <v-card-title>{{ destination.name }}</v-card-title>
            <v-card-subtitle>{{ destination.location }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-btn class="dest-btn">See More</v-btn>
    </div>

    <!-- 在某地最好的三个游乐项目 -->
    <div class="best-section">
      <h2 class="text-center">Best ON Chef</h2>
      <v-row>
        <v-col
          v-for="(theme, index) in themes"
          :key="index"
          cols="12"
          sm="4"
          class="column-interval"
        >
          <v-card class="card">
            <v-card-title class="themeSyle">{{ theme }}</v-card-title>
            <hr class="custom-line" />
            <v-row v-for="(event, id) in themeEvent1" :key="id" class="mb-4">
              <v-col cols="4">
                <v-card class="picture"></v-card>
              </v-col>
              <v-col cols="8" class="eventContent">
                <v-card-title class="eventName">{{ event.name }}</v-card-title>
                <v-card-subtitle class="eventName">{{
                  event.desc
                }}</v-card-subtitle>
              </v-col>
            </v-row>
            <div class="bottom_interval"></div>
          </v-card>
        </v-col>
      </v-row>
      <v-btn class="dest-btn">See More</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const destinations = ref<{ name: string; location: string; imgurl: string }[]>(
  []
);
const colors = [
  "success",
  "warning",
  "success",
  "warning",
  "success",
  "warning",
];
const themes = [
  "Top Tokyo Things to do ",
  "Top Things to do in Singapore",
  "Top Things to do in Bali",
];

let themeEvent1 = [
  { id: 1, name: "Tokyo Disney AAA", desc: "Tokyo Disneyland" },
  {
    id: 2,
    name: "Tokyo Disney BBB",
    desc: "Tokyo Disneyland & Tokyo DisneySea Park Tickets",
  },
  {
    id: 3,
    name: "Tokyo Disney CCC",
    desc: "Tokyo Disneyland & Tokyo DisneySea Park Tickets",
  },
];

// 获取数据
const fetchDestinations = async () => {
  try {
    const response = await axios.get("http://localhost:8080/spots");
    destinations.value = response.data;
    console.log(destinations.value);
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }
};

// 组件加载时获取数据
onMounted(fetchDestinations);

// 点击 Explore 按钮时跳转
// const goToDestination = (destination: any) => {
//   console.log("Navigating to:", destination.name);
// };
</script>

<style scoped>
.eventContent {
  margin-left: 0 !important;
  padding-left: 0 !important;
  text-align: left !important;
}
.eventName {
  height: auto;
  padding-left: 0 !important;
}
.picture {
  height: 75px;
  width: 75px;
  margin: 10px;
  left: 10px;
}
.bottom_interval {
  width: 100%;
  height: 20px;
}
.v-card-title,
.v-card-subtitle {
  text-align: left;
}

.v-card-subtitle {
  margin-bottom: 5px;
}

.v-card-title.themeSyle {
  font-size: large;
  font-weight: 500;
  margin-top: 10px;
}

.custom-line {
  border: none; /* 去掉默认边框 */
  width: 80%;
  height: 0.5px; /* 线条高度 */
  background-color: #f6bbbb; /* 线条颜色 */
  margin: 10px auto; /* 上下间距 */
}

.carousel-content {
  position: relative;
}

.title-content {
  position: absolute;
  top: 80px;
  z-index: 2;
  text-align: left;
  left: 8%;
}

.search-box {
  position: absolute;
  top: 210px;
  left: 8%;
  width: 60%;
  z-index: 2;
}

.search-input {
  background-color: white;
  border-radius: 8px;
  padding: 0;
  height: 56px;
}

.type {
  height: 64px;
}

.color-content {
  display: flex;
  height: 100%;
  justify-content: center;
  align-content: center;
  z-index: 1;
}

.column-interval {
  padding: 0;
}

.card {
  max-width: 400px;
  margin: 10px;
}

.text-center {
  text-align: left;
  margin-left: 10px;
}

.destination-section {
  margin-top: 30px;
}

.destination-card {
  transition: transform 0.3s;
}

.destination-card:hover {
  transform: scale(1.05);
}

.dest-btn {
  margin-top: 30px;
  width: 400px;
}
</style>
