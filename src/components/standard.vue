<template>
    <v-app>
      <v-app-bar color="background" :elevation="2">

        <v-app-bar-title><h2 class="logo">Chef Sheep</h2></v-app-bar-title>
  
        <!-- 以下从最后开始排 -->
        <v-spacer></v-spacer>  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/destinaitons">Destinations</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/login">Login</v-btn>
        <!-- <v-btn text to="/Home">Login</v-appbtn text :to="/Home" -->
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>

      <v-spacer></v-spacer>
      
    <v-footer color="background">
    <v-container class="text-center white--text">
      &copy; {{ new Date().getFullYear() }} 旅游探索 | 让旅行更精彩
    </v-container>
  </v-footer>
  
    </v-app>
  </template>
  
  <script setup lang="ts">
 

  </script>
  
  <style>
  .logo{
    color: #ff4040;
    text-align: left;
    margin-left: 10%;
  }

  </style>
  
  
  