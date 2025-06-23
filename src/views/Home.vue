<template>
  <!-- <div class="type"></div> -->

  <div class="carousel-content">
    <div class="title-content">
      <h2>玩点不一样</h2>
      <h4>无论旅途在哪，Chef Sheep随时随地带你开启精彩的玩乐世界！</h4>
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
      height="550"
      show-arrows="hover"
      cycle
      hide-delimiter-background
    >
      <v-carousel-item v-for="banner in bannerArray">
        <v-img
          :src="banner"
          cover
          class="color-content"
          loading="lazy"
          alt="轮播图"
        >
        </v-img>
        <div class="overlay"></div>
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
          <!-- <v-card class="card">
            <v-card
              :color="colors[index]"
              width="100%"
              height="200px"
              src="../assets/GreatWall.jpg"
            ></v-card>
            <v-card-title>{{ destination.name }}</v-card-title>
            <v-card-subtitle>{{ destination.location }}</v-card-subtitle>
          </v-card> -->
          <v-card class="card" width="90%">
            <v-img :src="picArray[index]" height="200px" cover></v-img>
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
            <v-row
              v-for="(event, id) in themeEvent[index]"
              :key="id"
              class="mb-4"
            >
              <v-col cols="4">
                <v-img
                  :src="event.img"
                  cover
                  class="picture"
                  loading="lazy"
                ></v-img>
              </v-col>
              <v-col cols="8" class="eventContent">
                <v-card-title class="eventName">{{ event.name }}</v-card-title>
                <v-card-subtitle class="eventDes">{{
                  event.desc
                }}</v-card-subtitle>
              </v-col>
            </v-row>

            <div class="bottom_interval"></div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- 可选择的其他地点 -->
    <div class="next-section">
      <h2 class="text-center">Where to next?</h2>
      <v-row>
        <v-col
          v-for="(destination, index) in destinations.slice(0, 6)"
          :key="index"
          cols="12"
          sm="2"
        >
          <v-card class="next-card">
            <v-img :src="picArray[index]" height="200px" cover>
              <v-card-title class="next-card-title">{{
                destination.name
              }}</v-card-title></v-img
            >
          </v-card>
        </v-col>
      </v-row>
      <v-btn class="dest-btn">See All</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import GreatWall from "../assets/GreatWall.jpg";
import Liberty from "../assets/Liberty.jpg";
import Fuji from "../assets/Fuji.jpg";
import Eiffel from "../assets/Eiffel Tower.jpg";
import Tokyo from "../assets/Tokyo.jpg";
import Sydney from "../assets/Sydney.jpg";
import banner1 from "../assets/banner.jpg";
import banner2 from "../assets/banner2.jpg";
import Sing from "../assets/Singapore.jpg";
import Bali from "../assets/Bali.jpg";
const bannerArray = [banner1, banner2];
const picArray = [GreatWall, Liberty, Fuji, Eiffel, Tokyo, Sydney];
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

let themeEvent = [
  [
    { id: 1, name: "Tokyo Disney AAA", desc: "Tokyo Disneyland", img: Tokyo },
    {
      id: 2,
      name: "Tokyo Disney BBB",
      desc: "Tokyo Disneyland & Tokyo DisneySea Park Tickets",
      img: Tokyo,
    },
    {
      id: 3,
      name: "Tokyo Disney CCC",
      desc: "Tokyo Disneyland & Tokyo DisneySea Park Tickets",
      img: Tokyo,
    },
  ],
  [
    { id: 1, name: "Tokyo Disney DDD", desc: "Tokyo Disneyland", img: Sing },
    {
      id: 2,
      name: "Tokyo Disney EEE",
      desc: "Tokyo Disneyland & Tokyo DisneySea Park Tickets",
      img: Sing,
    },
    {
      id: 3,
      name: "Tokyo Disney FFF",
      desc: "Tokyo Disneyland & Tokyo DisneySea Park Tickets",
      img: Sing,
    },
  ],
  [
    { id: 1, name: "Tokyo Disney GGG", desc: "Tokyo Disneyland", img: Bali },
    {
      id: 2,
      name: "Tokyo Disney HHH",
      desc: "Tokyo Disneyland & Tokyo DisneySea Park Tickets",
      img: Bali,
    },
    {
      id: 3,
      name: "Tokyo Disney III",
      desc: "Tokyo Disneyland & Tokyo DisneySea Park Tickets",
      img: Bali,
    },
  ],
];

// 用异步获取数据
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
  font-weight: 400;
  font-size: 18px;
}
.eventDes {
  height: auto;
  padding-left: 0 !important;
  font-weight: 300;
  font-size: 15px;
}
.picture {
  height: 75px;
  width: 75px;
  margin: 10px;
  left: 10px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
  top: 140px;
  z-index: 2;
  text-align: left;
  left: 8%;
  color: white;
}

.search-box {
  position: absolute;
  top: 270px;
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

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); /* 黑色透明遮罩 */
  z-index: 1;
}

.color-content {
  display: flex;
  height: 100%;
  width: 100%;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.text-center {
  text-align: left;
  margin-left: 10px;
  margin-top: 50px;
  font-weight: 500;
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

.next-card {
  height: 200px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.next-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.next-card-title {
  margin-top: 90%;
  font-size: small;
  color: azure;
  font-weight: 400;
}
</style>
