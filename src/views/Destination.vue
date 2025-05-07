<template>
  <div class="type"></div>
  <div class="intro">
    <div class="pattern">
      <v-row>
        <v-col cols="6"> </v-col>
        <v-col cols="6" class="cityImg">
          <v-carousel
            height="350px"
            show-arrows="hover"
            cycle
            hide-delimiter-background
          >
            <v-carousel-item v-for="color in colors">
              <v-sheet :color="color" class="color-content"> </v-sheet>
              <!-- <div class="d-flex fill-height justify-center align-center"></div> -->
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = [
  "success",
  "warning",
  "success",
  "warning",
  "success",
  "warning",
];
</script>

<style>
.cityImg {
  height: 100%;
}
.color-content {
  display: flex;
  height: 100%;
  justify-content: center;
  align-content: center;
  z-index: 2;
}
.type {
  height: 50px;
}
.intro {
  position: relative;
  height: 420px;
  background-color: aqua;
  width: auto;
}
.pattern {
  position: absolute;
  width: 90%;
  height: 350px;
  background-color: blue !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px !important;
  z-index: 1;
  overflow: hidden;
}
</style>
