<template>
  <!-- <h1>我是首页</h1> -->
  <div>
    <!-- 因为已经注册为全局组件，所以TypeNav组件不需要在import引入了 -->
    <TypeNav />

    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <like></like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor>

    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";

export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },

  mounted() {
    this.$store.dispatch("getFloorList");
    // 获取用户信息
    // this.$store.dispatch('getUserInfo')
    // console.log(this)
  },

  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList
    }),
  },
};
</script>

<style>
</style>