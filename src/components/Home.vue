<template>
    <v-container fluid>
      <!-- Hero Section -->
      <v-img 
        src="https://img2.baidu.com/it/u=3610257256,985539045&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"  
        class="hero-image"
      >
        <v-container class="hero-content">
          <v-text-field
            v-model="searchQuery"
            label="Search destinations"
            prepend-inner-icon="mdi-magnify"
            variant="filled"
            density="comfortable"
            class="search-box"
          ></v-text-field>
        </v-container>
      </v-img>
  
      <!-- 推荐目的地 -->
      <v-container class="destination-section">
        <h2 class="text-center">Popular Destinations</h2>
        <v-row>
          <v-col v-for="(dest, index) in destinations" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card class="destination-card">
              <v-img :src="dest.image" height="200px" cover></v-img>
              <v-card-title>{{ dest.name }}</v-card-title>
              <v-card-subtitle>{{ dest.location }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary" @click="goToDestination(dest)">Explore</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const searchQuery = ref(""); // 搜索框内容
  const destinations = ref([
    { name: "Paris", location: "France", image: "https://source.unsplash.com/400x300/?paris" },
    { name: "Tokyo", location: "Japan", image: "https://source.unsplash.com/400x300/?tokyo" },
    { name: "New York", location: "USA", image: "https://source.unsplash.com/400x300/?newyork" },
    { name: "Sydney", location: "Australia", image: "https://source.unsplash.com/400x300/?sydney" },
  ]);
  
  // 点击 Explore 按钮时跳转
  const goToDestination = (destination: any) => {
    console.log("Navigating to:", destination.name);
  };
  </script>
  
  <style scoped>
  .v-container{
    padding:0;
  }
  .hero-image {
    position: relative; /* Keep it in the flow of the document */
    width: 100%;
    height: auto;
    padding:0;
    margin:0;
  }
  
  .hero-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

  }
  
  .search-box {
    width: 50%;
    background-color: white;
    border-radius: 8px;
    z-index: 2; /* Make sure the search box stays above the image */
    position: relative; /* Ensure search box is above image */
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
  