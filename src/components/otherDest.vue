<template>
  <div class="next-section">
    <v-row>
      <v-col
        v-for="(destination, index) in destinations.slice(0, 6)"
        :key="index"
        cols="12"
        sm="2"
      >
        <v-card
          class="next-card"
          :ripple="false"
          @click="gotoDetail(destination.id)"
          hover
        >
          <v-img :src="picArray[index]" height="200px" loading="lazy" cover>
            <v-card-title class="next-card-title">{{
              destination.name
            }}</v-card-title></v-img
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
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

const router = useRouter();
const bannerArray = [banner1, banner2];
const picArray = [GreatWall, Liberty, Fuji, Eiffel, Tokyo, Sydney];
const destinations = ref<
  { id: number; name: string; location: string; imgurl: string }[]
>([]);
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

function gotoDetail(id: number) {
  router.push(`/destinations/${id}`);
}

// 点击 Explore 按钮时跳转
// const goToDestination = (destination: any) => {
//   console.log("Navigating to:", destination.name);
// };
</script>

<style scoped>
.text-center {
  text-align: left;
  margin-left: 10px;
  margin-top: 50px;
  font-weight: 500;
}
.next-card {
  height: 200px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  --v-theme-overlay-multiplier: 0 !important;
}

.next-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.next-card-title {
  margin-top: 90%;
  font-size: 12px;
  color: azure;
  font-weight: 400;
}

.dest-btn {
  margin-top: 30px;
  width: 400px;
  --v-theme-overlay-multiplier: 0 !important;
}
</style>
