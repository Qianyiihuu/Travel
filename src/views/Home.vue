<template>
      <!-- 推荐目的地 -->
      <v-container class="destination-section">
        <h2 class="text-center">Popular Destinations</h2>
      <v-row>
      <v-col v-for="destination in destinations.slice(0,6)" :key="destination.name" cols="12" sm="4" class="column-interval">
        <v-card class="card">
          <v-img :src="destination.imgurl" width="350px" height="200px"></v-img>
          <v-card-title>{{ destination.name }}</v-card-title>
          <v-card-subtitle>{{ destination.location }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
      </v-container>

  </template>
  
  <script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
  

  const destinations = ref<{ name: string; location: string; imgurl: string }[]>([]);

// 获取数据
const fetchDestinations = async () => {
  try {
    const response = await axios.get("http://localhost:8080/spots");
    destinations.value = response.data;
    console.log(destinations.value)
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
  .column-interval{
    padding:0;
  }
  .card{
    max-width: 400px;
    margin:10px;
  }

  
  .hero-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

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
  </style>
  